import React, { memo, useState } from "react";

import { Form, Formik } from "formik";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { useRouter } from "next/router";
import { array, number, object } from "yup";

import {
  Button,
  DataTable,
  DataTableRefreshActionButtonIcon,
  IconButtonWrapper,
  TextFieldFormDataTable,
  WarningUnsavedForm,
} from "@/components";
import DataTableMarkActionButtonIcon from "@/components/DataTableMarkActionButtonIcon/DataTableMarkActionButtonIcon";
import LoadingContainer from "@/containers/LoadingContainer";
import { FieldWrapper } from "@/forms/style";
import { CheckIcon, CloseIcon, SaveIcon } from "@/icons";
import { PeerEvaluationStudentsLecturerMarkInput } from "@/pages/api/resolvers/peer-evaluation-student-lecturer-mark";
import useUpdatePeerEvaluationStudentsLecturerMark from "@/requests/hooks/mutations/useUpdatePeerEvaluationStudentsLecturerMark";
import useUpdatePeerEvaluationStudentTeamCalculateResultsTable from "@/requests/hooks/mutations/useUpdatePeerEvaluationStudentTeamCalculateResultsTable";
import routing from "@/routing";
import { IPeerEvaluationStudent } from "@/transformers/students";
import { ObjectArray, ObjectNormalizedType, getNormalizedObjectArray, objectToArrayOfObject } from "@/utils/form";

interface IStudentLecturerMarkTable {
  ids: {
    [x: string]: object;
  }[];
  lecturerAdjustedMarks: {
    [x: string]: object;
  }[];
}

interface IStudentLecturerMark {
  id: string;
  lecturerAdjustedMark: string | number | null;
}

interface IPeerEvaluationStudentsDataTable {
  data: [IPeerEvaluationStudent] | [] | null;
  peerEvaluationId: string;
  isReadOnly: boolean;
  onRefreshStudents: () => Promise<void>;
}

const PeerEvaluationStudentsDataTable = ({
  data,
  peerEvaluationId,
  isReadOnly,
  onRefreshStudents,
}: IPeerEvaluationStudentsDataTable) => {
  const { push } = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const [updatePeerEvaluationStudentsLecturerMark] = useUpdatePeerEvaluationStudentsLecturerMark(
    "UpdatePeerEvaluationStudentsLecturerMark"
  );

  const [updatePeerEvaluationStudentTeamCalculateResultsTable] =
    useUpdatePeerEvaluationStudentTeamCalculateResultsTable("UpdatePeerEvaluationStudentTeamCalculateResultsTable");

  const validationSchema = object({
    lecturerAdjustedMarks: array().of(
      object().shape({
        lecturerAdjustedMark: number()
          .min(0, "Value needs to be higher than 0")
          .max(100, "Value cannot be higher than 100")
          .nullable(),
      })
    ),
  });

  const onViewResultsPeerEvaluationStudent = (studentId: string) => {
    setRedirecting(true);
    push({
      pathname: `${routing.peerEvaluation.result.student}/${peerEvaluationId}/${studentId}`,
    });
  };

  const onCalculateMarks = async () => {
    if (peerEvaluationId) {
      await updatePeerEvaluationStudentTeamCalculateResultsTable({
        variables: {
          where: {
            peerEvaluationId: peerEvaluationId,
          },
        },
      });

      await onRefreshStudents();
    }
  };

  const dataTableColumns: MUIDataTableColumn[] = [
    {
      name: "",
      options: {
        viewColumns: false,
        filter: false,
        sort: false,
        empty: false,
        download: false,
        customBodyRender: (_, tableMeta) => {
          return (
            <FieldWrapper marginBottom="1em">
              <Button
                onClick={() => {
                  const dataTable = tableMeta.currentTableData[tableMeta.rowIndex] as unknown as { data: string };
                  onViewResultsPeerEvaluationStudent(dataTable.data[1] as string);
                }}
                testId={""}
                variant="contained"
              >
                Peer Evaluation
              </Button>
            </FieldWrapper>
          );
        },
      },
    },
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "userName",
      label: "Student Name",
    },
    {
      name: "userEmail",
      label: "Student Email",
      options: {
        filterType: "textField",
      },
    },
    {
      name: "userEmailVerified",
      label: "Student Verified",
      options: {
        display: false,
        filter: false,
      },
    },
    {
      name: "updatedAt",
      label: "Updated",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      name: "averageCriteriaScore",
      label: "Avg Criteria Score",
      options: {
        display: false,
      },
    },
    {
      name: "averageCriteriaScoreByTeamMember",
      label: "Avg Criteria Score by Team Member",
      options: {
        display: false,
      },
    },
    {
      name: "systemCalculatedMark",
      label: "System Calculated Mark",
      options: {
        display: false,
      },
    },
    {
      name: "systemAdjustedMark",
      label: "System Adjusted Mark",
    },
    {
      name: "lecturerAdjustedMark",
      label: "Lectured Adjusted Mark",
      options: {
        customBodyRender: (_, tableMeta, updateValue) => (
          <FieldWrapper marginBottom="3em">
            <TextFieldFormDataTable
              updateDataTableFormValue={updateValue}
              validationSchema={validationSchema}
              validationFieldPath={"lecturerAdjustedMarks.lecturerAdjustedMark"}
              testId=""
              name={`lecturerAdjustedMarks[${tableMeta.rowIndex}].lecturerAdjustedMark`}
              props={{
                name: `lecturerAdjustedMarks[${tableMeta.rowIndex}].lecturerAdjustedMark`,
                fullWidth: true,
                label: "Mark",
                type: "number",
                variant: "outlined",
                inputProps: { min: 0, max: 100, step: "0.01" },
                disabled: isReadOnly,
              }}
            />
          </FieldWrapper>
        ),
      },
    },
    {
      name: "finalMark",
      label: "Final Mark",
    },
    {
      name: "peerEvaluationStudentTeamName",
      label: "Team Name",
    },
    {
      name: "peerEvaluationStudentTeamMark",
      label: "Team Mark",
    },
    {
      name: "peerEvaluationReviewedIsCompleted",
      label: "Peer Evaluation Completed",

      options: {
        customBodyRender: (value: Date | null) => {
          if (value) {
            return <CheckIcon testId={""} />;
          }

          return <CloseIcon testId={""} />;
        },
      },
    },
  ];

  const dataTableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no students",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
    selectableRowsHeader: true,
    rowHover: true,
    download: true,
    sort: false,
    filter: true,
    search: true,
    viewColumns: true,
    pagination: true,
    rowsPerPage: 10,
    print: false,
    enableNestedDataAccess: ".",
    downloadOptions: {
      filename: `peer_evaluations_students-${new Date().getTime()}.csv`,
    },
    draggableColumns: {
      enabled: true,
    },
    customToolbar: (_) => (
      <>
        <DataTableRefreshActionButtonIcon
          onClick={onRefreshStudents}
          testId={"peer-evaluation-students-refresh-icon"}
          toolTipLabel={"Refresh"}
        />
        <DataTableMarkActionButtonIcon
          onClick={onCalculateMarks}
          testId={"-refresh-peer-evaluation-table"}
          toolTipLabel={"Calculate Marks"}
        />
        <IconButtonWrapper type="submit" testId={""} tooltip={"Save"} disabled={isReadOnly}>
          <SaveIcon testId="" fontSize="medium" color="inherit" />
        </IconButtonWrapper>
      </>
    ),
  };

  const onSubmitStudentLecturerMarks = async (data: IStudentLecturerMarkTable) => {
    const studentLecturerMarks = getNormalizedObjectArray(
      data as unknown as ObjectNormalizedType
    ) as IStudentLecturerMark[];

    const studentLecturerMarksSanitized = studentLecturerMarks.map(({ id, lecturerAdjustedMark }) => ({
      id,
      lecturerAdjustedMark: lecturerAdjustedMark ? Number(lecturerAdjustedMark) : null,
    })) as unknown as PeerEvaluationStudentsLecturerMarkInput[];

    await updatePeerEvaluationStudentsLecturerMark({
      variables: {
        where: {
          peerEvaluationStudentsLecturerMarkData: studentLecturerMarksSanitized,
        },
      },
    });

    await onRefreshStudents();
  };

  const isLoading = !data || isRedirecting;

  if (isLoading) {
    return <LoadingContainer loading />;
  }

  return (
    <Formik
      initialValues={{
        ids: objectToArrayOfObject("id", data as unknown as ObjectArray),
        lecturerAdjustedMarks: objectToArrayOfObject("lecturerAdjustedMark", data as unknown as ObjectArray),
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => onSubmitStudentLecturerMarks(data)}
    >
      {({ dirty }) => (
        <Form>
          <WarningUnsavedForm areChangesUnsaved={dirty} />
          <DataTable
            testId={"peer-evaluation-students-datatable"}
            isVisible={!!data}
            data={data}
            columns={dataTableColumns}
            options={dataTableOptions}
          />
        </Form>
      )}
    </Formik>
  );
};

export default memo(PeerEvaluationStudentsDataTable);
