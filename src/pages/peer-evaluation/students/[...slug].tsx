import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import {
  PeerEvaluation,
  PeerEvaluationStudentTeamCreateManyInput,
  PeerEvaluationTeachingMember,
} from "@generated/type-graphql";
import { Prisma } from "@prisma/client";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Action, Fab } from "react-tiny-fab";
import { ValidationError } from "yup";

import { Base, Dialog, PageTitle, Typography, UploadButton } from "@/components";
import { ObjectCSV } from "@/components/UploadButton/UploadButton";
import {
  PeerEvaluationNavigationFab,
  PeerEvaluationStudentTeamActionsDialog,
  PeerEvaluationStudentsDataTable,
} from "@/containers";
import {
  EditBulkAction,
  IStudentTeamToEditBulk,
  ITeamToCreateBulk,
} from "@/containers/PeerEvaluationStudentTeamActionsDialog";
import { CheckIcon, EditIcon, WidgetsIcon } from "@/icons";
import createManyPeerEvaluationStudentTeams from "@/requests/direct/mutation/createManyPeerEvaluationStudentTeams";
import createMultipleUsers from "@/requests/direct/mutation/createMultipleUsers";
import createPeerEvaluationStudent from "@/requests/direct/mutation/createPeerEvaluationStudent";
import updatePeerEvaluationStudent from "@/requests/direct/mutation/updatePeerEvaluationStudent";
import upsertPeerEvaluationTableLecturer from "@/requests/direct/mutation/upsertPeerEvaluationTableLecturer";
import getGroupByPeerEvaluationStudentTeam from "@/requests/direct/query/getGroupByPeerEvaluationStudentTeam";
import getGroupByUserByEmail from "@/requests/direct/query/getGroupByUserByEmail";
import getPeerEvaluationStatus from "@/requests/direct/query/getPeerEvaluationStatus";
import getPeerEvaluationStudentTeamExist from "@/requests/direct/query/getPeerEvaluationStudentTeamExist";
import useGetPeerEvaluationStudents from "@/requests/hooks/query/useGetPeerEvaluationStudents";
import useGetUserPeerEvaluationTeachingMember from "@/requests/hooks/query/useGetUserPeerEvaluationTeachingMember";
import { IPeerEvaluationStudent, sanitizePeerEvaluationStudentsDataOnFetch } from "@/transformers/students";
import { IStudentsTeamData } from "@/types/peer-evaluation";
import { IUserData } from "@/types/user";
import { RoleScope, errorNotification, loadingNotification, promiseNotification, successNotification } from "@/utils";
import exampleFile from "@/utils/example-file";
import { ObjectArray, objectToArrayOfObjectInline } from "@/utils/form";
import { peerEvaluationStudentsTeams } from "@/utils/validator";

const Students: NextPage = () => {
  const { data: session } = useSession();

  const { query, isFallback } = useRouter();

  const apolloClient = useApolloClient();

  const [isRedirecting, setRedirecting] = useState(false);

  const [openEditBulkDialog, setOpenEditBulkDialog] = useState(false);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [openPeerEvaluationEditAction, setOpenPeerEvaluationEditAction] = useState<boolean>(false);

  const [studentTeamsDataCSV, setStudentTeamsDataCSV] = useState<IStudentsTeamData[]>([]);

  const [studentTeamToCreateState, setStudentTeamToCreateState] = useState<ITeamToCreateBulk[]>([]);

  const [studentToCreateState, setStudentToCreateState] = useState<IStudentTeamToEditBulk[]>([]);

  const [studentToUpdateState, setStudentToUpdateState] = useState<IStudentTeamToEditBulk[]>([]);

  const [peerEvaluationStatusState, setPeerEvaluationStatusState] = useState<PeerEvaluation["status"]>("DRAFT");

  const [teachingMemberRole, setTeachingMemberRole] = useState<PeerEvaluationTeachingMember["role"]>("VIEWER");

  const [peerEvaluationStudentsData, setPeerEvaluationStudentsData] = useState<[IPeerEvaluationStudent] | [] | null>(
    null
  );

  const [studentsTeamsDataErrors, setStudentsTeamsDataErrors] = useState<
    { [key: string]: string | number | null }[] | null
  >(null);

  const [
    getPeerEvaluationStudents,
    {
      loading: loadingStudentsData,
      error: errorStudentsData,
      data: dataStudentsData,
      refetch: runRefreshPeerEvaluationStudents,
    },
  ] = useGetPeerEvaluationStudents("GetPeerEvaluationStudents");

  const [
    getPeerEvaluationTeachingMember,
    { loading: loadingTeachingMember, error: errorTeachingMember, data: dataTeachingMember },
  ] = useGetUserPeerEvaluationTeachingMember("GetUserPeerEvaluationTeachingMember");

  const onRefreshStudents = async () => {
    promiseNotification(runRefreshPeerEvaluationStudents(), {
      loading: "Refreshing students",
      success: "Refreshed successfully",
      error: "Error refreshing students",
    });
  };

  const onUploadCSVStudentsTeam = async (csvData: ObjectCSV) => {
    loadingNotification("Processing csv...", "onUploadCSVStudentsTeam");

    const studentsTeamsData = csvData as unknown as [IStudentsTeamData];

    const studentsTeamsDataError: { [key: string]: string | number | null }[] = [];

    const columnsCSV: { [key: string]: string | number | null } = {
      row: 0,
      studentEmail: "",
      teamName: "",
    };

    for (const studentTeamData of studentsTeamsData) {
      try {
        await peerEvaluationStudentsTeams.validate(studentTeamData, {
          abortEarly: false,
        });
      } catch (error: unknown) {
        const errorValidation = error as ValidationError;

        const studentTeamDataIndexError = studentsTeamsData.findIndex(
          (studentTeamDataFound) => studentTeamDataFound === studentTeamData
        );

        const rawBulkError: { [key: string]: string | number | null } = {
          ...columnsCSV,
          row: studentTeamDataIndexError + 2,
        };

        for (const errorBulk of errorValidation.inner) {
          if (errorBulk.path && errorBulk.message) {
            rawBulkError[errorBulk.path] = errorBulk.message;
          }
        }

        studentsTeamsDataError.push(rawBulkError);
      }
    }

    if (studentsTeamsDataError.length) {
      errorNotification("The CSV contains error, please review the errors below", "onUploadCSVStudentsTeam");
      setStudentsTeamsDataErrors(studentsTeamsDataError);
      return null;
    }

    if (session && peerEvaluationId) {
      if (session.user.role !== "ADMIN" && teachingMemberRole === "VIEWER") {
        errorNotification("You do not have permission to edit this peer evaluation", "onUploadCSVStudentsTeam");
        return null;
      }

      // Sanitize the studentsTeamsData

      const studentsTeamsDataSanitized = studentsTeamsData.map((studentTeamsData) => {
        if (!studentTeamsData.teamName) {
          return {
            ...studentTeamsData,
            teamName: `Team - ${studentTeamsData.studentEmail}`,
          };
        }

        return {
          ...studentTeamsData,
        };
      });

      setStudentTeamsDataCSV(studentsTeamsDataSanitized);

      // Get Peer Evaluation Status

      const {
        data: {
          peerEvaluation: { status: PeerEvaluationStatus },
        },
      } = await getPeerEvaluationStatus(apolloClient, peerEvaluationId);

      // Students Team

      const listTeamNames = objectToArrayOfObjectInline(
        "teamName",
        studentsTeamsDataSanitized as unknown as ObjectArray
      );

      const listTeamNamesSanitized = listTeamNames.filter((team) => team !== null) as unknown as string[];

      const {
        data: { groupByPeerEvaluationStudentTeam },
      } = await getGroupByPeerEvaluationStudentTeam(apolloClient, peerEvaluationId, listTeamNamesSanitized);

      const studentTeamsToCreate = [];

      if (groupByPeerEvaluationStudentTeam.length) {
        const teamsCreated = groupByPeerEvaluationStudentTeam.map(({ name }) => name);

        const teamToCreate = new Set(listTeamNamesSanitized.filter((teamName) => teamsCreated.indexOf(teamName) < 0));

        studentTeamsToCreate.push(...teamToCreate);
      } else {
        studentTeamsToCreate.push(...listTeamNamesSanitized);
      }

      // Students
      const listStudentEmails = objectToArrayOfObjectInline(
        "studentEmail",
        studentsTeamsDataSanitized as unknown as ObjectArray
      ) as unknown as string[];

      const studentToCreate: string[] = [];

      const studentToUpdate: string[] = [];

      const {
        data: {
          peerEvaluationStudentTeamExist: { studentList: studentsCreatedList },
        },
      } = await getPeerEvaluationStudentTeamExist(apolloClient, peerEvaluationId, listStudentEmails);

      if (!studentsCreatedList.length) {
        studentToCreate.push(...listStudentEmails);
      } else {
        const listStudentCreatedEmail = studentsCreatedList.map(({ email }) => email) as string[];

        studentToCreate.push(...listStudentEmails.filter((email) => listStudentCreatedEmail.indexOf(email) < 0));

        studentToUpdate.push(...listStudentCreatedEmail);
      }

      // Create Student Team Table
      const studentTeamsToCreateTable = studentTeamsToCreate.map((teamName) => ({
        action: EditBulkAction.CREATE,
        teamName: teamName,
      })) as [ITeamToCreateBulk];

      // Create Student Table
      const studentToCreateTable = studentsTeamsDataSanitized.map((student) => {
        if (!studentToCreate.includes(student.studentEmail)) {
          return null;
        }

        return {
          ...student,
          action: EditBulkAction.CREATE,
        };
      });

      const studentToCreateTableSanitized = studentToCreateTable.filter(
        (student) => student !== null
      ) as IStudentTeamToEditBulk[];

      // Update Student Table
      const studentToUpdateTable = studentsTeamsDataSanitized.map((student) => {
        if (studentToUpdate.includes(student.studentEmail)) {
          return {
            ...student,
            action: EditBulkAction.UPDATE,
          };
        }

        return null;
      });

      const studentToUpdateTableSanitized = studentToUpdateTable.filter(
        (student) => student !== null
      ) as IStudentTeamToEditBulk[];

      setPeerEvaluationStatusState(PeerEvaluationStatus);
      setStudentTeamToCreateState(studentTeamsToCreateTable);
      setStudentToCreateState(studentToCreateTableSanitized);
      setStudentToUpdateState(studentToUpdateTableSanitized);

      successNotification("Processed correctly", "onUploadCSVStudentsTeam");

      setOpenPeerEvaluationEditAction(true);
      setOpenEditBulkDialog(false);
    }
  };

  const onUploadCSVStudentsTeamAccept = async () => {
    loadingNotification("Running bulk changes...", "onUploadCSVStudentsTeamAccept");

    if (!peerEvaluationId) {
      return null;
    }

    const initialStudentTeam: PeerEvaluationStudentTeamCreateManyInput = {
      name: "",
      mark: new Prisma.Decimal(0),
      peerEvaluationId: "",
    };

    const studentTeamsData = studentTeamToCreateState.map((data) => ({
      ...initialStudentTeam,
      name: data.teamName,
      peerEvaluationId: peerEvaluationId,
    })) as [PeerEvaluationStudentTeamCreateManyInput];

    const { errors } = await createManyPeerEvaluationStudentTeams(apolloClient, studentTeamsData);

    if (errors?.length) {
      // TODO: Add Error handler
    }

    const listUsersEmail = [...studentToCreateState, ...studentToUpdateState].map(({ studentEmail }) => studentEmail);

    const {
      data: { groupByUser: listUsersCreated },
      errors: errorQueryingUsersByEmails,
    } = await getGroupByUserByEmail(apolloClient, listUsersEmail);

    if (errorQueryingUsersByEmails?.length) {
      // TODO: Add Error handler
    }

    const listUserToCreate = [...studentToCreateState, ...studentToUpdateState].filter(({ studentEmail }) =>
      listUsersCreated.findIndex(({ email }) => studentEmail === email)
    );

    const usersBulkCreateSanitized = listUserToCreate.map(({ studentEmail }) => {
      return {
        email: studentEmail,
        name: studentTeamsDataCSV.find((data) => data.studentEmail === studentEmail)?.studentName || "",
        role: "STUDENT",
      };
    }) as IUserData[];

    const { errors: errorsCreatingMultipleUsers } = await createMultipleUsers(apolloClient, usersBulkCreateSanitized);

    if (errorsCreatingMultipleUsers?.length) {
      // TODO: Add Error handler
    }

    const createBulkStudents = studentToCreateState.map(({ studentEmail, teamName }) => ({
      studentName: studentTeamsDataCSV.find((data) => data.studentEmail === studentEmail)?.studentName || "",
      averageCriteriaScore: new Prisma.Decimal(0),
      averageCriteriaScoreByTeamMember: new Prisma.Decimal(0),
      systemCalculatedMark: new Prisma.Decimal(0),
      systemAdjustedMark: new Prisma.Decimal(0),
      lecturerAdjustedMark: undefined,
      finalMark: new Prisma.Decimal(0),
      user: {
        connect: {
          email: studentEmail,
        },
      },
      peerEvaluation: {
        connect: {
          id: peerEvaluationId,
        },
      },
      peerEvaluationStudentTeam: {
        connect: {
          name_peerEvaluationId: {
            peerEvaluationId: peerEvaluationId,
            name: teamName,
          },
        },
      },
    }));

    const createPeerEvaluationStudents = createBulkStudents.map((student) =>
      createPeerEvaluationStudent(apolloClient, student)
    );

    await Promise.all(createPeerEvaluationStudents);

    const updatePeerEvaluationStudents = studentToUpdateState.map(({ studentEmail, teamName }) =>
      updatePeerEvaluationStudent(
        apolloClient,
        peerEvaluationId,
        listUsersCreated.find((data) => data.email === studentEmail)?.id || "",
        studentTeamsDataCSV.find((data) => data.studentEmail === studentEmail)?.studentName || "",
        teamName
      )
    );

    await Promise.all(updatePeerEvaluationStudents);

    await upsertPeerEvaluationTableLecturer(apolloClient, peerEvaluationId);

    setOpenPeerEvaluationEditAction(false);
    runRefreshPeerEvaluationStudents();

    successNotification("Success", "onUploadCSVStudentsTeamAccept");
  };

  const columnsUserDataBulkError = [
    {
      name: "row",
      label: "Row",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "studentEmail",
      label: "Student Email",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: Date | null) => {
          if (value) {
            return value;
          }

          return <CheckIcon testId={"bulk-data-name-valid"} />;
        },
      },
    },
    {
      name: "teamName",
      label: "Team Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: Date | null) => {
          if (value) {
            return value;
          }

          return <CheckIcon testId={"bulk-data-email-valid"} />;
        },
      },
    },
  ];

  const tableOptionsUserDataBulkError: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Bulk data without error",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
    selectableRowsHeader: false,
    rowHover: true,
    download: false,
    print: false,
    rowsPerPage: 100,
    pagination: true,
    filter: false,
    search: false,
    viewColumns: false,
  };

  const isLoading =
    loadingStudentsData ||
    loadingTeachingMember ||
    !!!dataStudentsData ||
    !!!dataTeachingMember ||
    isRedirecting ||
    isFallback;

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug)) {
      setPeerEvaluationId(slug[0]);
    }
  }, [query.slug]);

  useEffect(() => {
    if (peerEvaluationId && session) {
      getPeerEvaluationStudents({
        variables: {
          where: {
            peerEvaluationId: {
              equals: peerEvaluationId,
            },
          },
          orderBy: [
            {
              updatedAt: "asc",
            },
          ],
        },
      });

      getPeerEvaluationTeachingMember({
        variables: {
          where: {
            userId_peerEvaluationId: {
              peerEvaluationId: peerEvaluationId,
              userId: session.user.id,
            },
          },
        },
      });
    }
  }, [getPeerEvaluationStudents, getPeerEvaluationTeachingMember, peerEvaluationId, session]);

  useEffect(() => {
    if (dataStudentsData && dataTeachingMember) {
      setPeerEvaluationStudentsData(sanitizePeerEvaluationStudentsDataOnFetch(dataStudentsData.peerEvaluationStudents));
      setTeachingMemberRole(dataTeachingMember.peerEvaluationTeachingMember.role);
    }
  }, [dataStudentsData, dataTeachingMember]);

  const isError = !!errorStudentsData || !!errorTeachingMember;

  return (
    <Base topLeftComponent="menu" loading={isLoading} error={isError}>
      <PageTitle title={"Students"} testId="page-update-peer-evaluation-title" variant="h4" margin="2em" />

      {peerEvaluationStudentsData && peerEvaluationId && (
        <PeerEvaluationStudentsDataTable
          peerEvaluationId={peerEvaluationId}
          isReadOnly={teachingMemberRole === "VIEWER"}
          data={peerEvaluationStudentsData}
          onRefreshStudents={onRefreshStudents}
        />
      )}

      {!openPeerEvaluationEditAction && (
        <Fab icon={<WidgetsIcon testId={""} />}>
          <Action text="Edit" onClick={() => setOpenEditBulkDialog(true)}>
            <EditIcon testId={""} />
          </Action>
        </Fab>
      )}

      <PeerEvaluationNavigationFab setRedirecting={() => setRedirecting(true)} hide={openPeerEvaluationEditAction} />

      <Dialog
        testId={"bulk-add-edit-dialog"}
        title={"Bulk add/update students and teams"}
        content={
          <Typography testId={"bulk-add-edit-dialog-text"}>
            Download the example csv file, to add/update in bulk students and teams.
          </Typography>
        }
        rightButton="Download Example"
        leftButton="Cancel"
        rightButtonVariant="outlined"
        maxWidth="md"
        onClickRightButton={() => (window.location.href = exampleFile.lecturerPeerEvaluationStudentTeams)}
        onClickLeftButton={() => setOpenEditBulkDialog(false)}
        extraRightButton={<UploadButton onFilesSelected={onUploadCSVStudentsTeam} />}
        open={openEditBulkDialog}
      />

      <Dialog
        testId={"user-bulk-error-dialog"}
        title={"Bulk Data Errors"}
        content={
          studentsTeamsDataErrors && (
            <MUIDataTable
              title={""}
              data={studentsTeamsDataErrors}
              columns={columnsUserDataBulkError}
              options={tableOptionsUserDataBulkError}
            />
          )
        }
        rightButton="Reupload CSV"
        rightButtonVariant="contained"
        leftButton="Cancel"
        fullScreen
        onClickLeftButton={() => {
          setStudentsTeamsDataErrors(null);
          setOpenEditBulkDialog(false);
        }}
        onClickRightButton={() => {
          setStudentsTeamsDataErrors(null);
          setOpenEditBulkDialog(true);
        }}
        open={studentsTeamsDataErrors !== null}
      />

      <PeerEvaluationStudentTeamActionsDialog
        isOpen={openPeerEvaluationEditAction}
        peerEvaluationStatus={peerEvaluationStatusState}
        studentTeamToCreate={studentTeamToCreateState}
        studentToCreate={studentToCreateState}
        studentToUpdate={studentToUpdateState}
        onAccept={onUploadCSVStudentsTeamAccept}
        onCancel={() => setOpenPeerEvaluationEditAction(false)}
      />
    </Base>
  );
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
};

export default Students;
