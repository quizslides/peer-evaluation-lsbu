import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { User } from "@generated/type-graphql";
import { FormControl, FormHelperText, Grid } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { useSession } from "next-auth/react";

import {
  Button,
  ConfirmationDialog,
  DataTable,
  DataTableAddActionButtonIcon,
  Error,
  IconButtonWrapper,
} from "@/components";
import { DataTableEditDeleteToolbar } from "@/containers";
import CreatePeerEvaluationTeachingMemberForm from "@/containers/CreatePeerEvaluationTeachingMemberForm";
import LoadingContainer from "@/containers/LoadingContainer";
import UpdatePeerEvaluationTeachingMemberForm from "@/containers/UpdatePeerEvaluationTeachingMemberForm";
import content from "@/content";
import { DeleteIcon, EditIcon } from "@/icons";
import useGetLecturerUsers from "@/requests/hooks/query/useGetLecturerUsers";
import { ArrayObject } from "@/types/object";
import {
  FieldStatus,
  PeerEvaluationTeachingMember,
  PeerEvaluationTeachingMemberRoles,
  peerEvaluationTeachingMemberDataTableColumnOrder,
} from "@/types/peer-evaluation";
import { Role, errorNotification } from "@/utils";
import { getMergedKeyValuesObject } from "@/utils/form";

interface IPeerEvaluationTeachingMemberContainer {
  helperText: string;
  testId: string;
  name: string;
  isDisabled: boolean;
}

const Wrapper = styled.div`
  margin-top: 2em;
  position: relative;
  margin-bottom: 1em;
`;

const BottomRight = styled.div`
  position: absolute;
  bottom: 100;
  right: 0;
`;

const Container = styled.div`
  margin-right: 2em;
`;

const PeerEvaluationTeachingMemberFormWrapper = ({
  testId,
  helperText,
  name,
  isDisabled,
}: IPeerEvaluationTeachingMemberContainer) => {
  const { data: session } = useSession();

  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);

  const { data, loading, error: errorRequest } = useGetLecturerUsers();

  const [dataTablePeerEvaluationTeachingMembers, setDataTablePeerEvaluationTeachingMembers] = useState<
    PeerEvaluationTeachingMember[]
  >(meta.value);

  const [currentPeerEvaluationTeachingMembers, setCurrentPeerEvaluationTeachingMembers] = useState<
    PeerEvaluationTeachingMember[]
  >(field.value);

  const [peerEvaluationTeachingMembersAvailable, setPeerEvaluationTeachingMembersAvailable] = useState<User[]>([]);

  const [isCreatePeerEvaluationTeachingMemberOpen, setCreatePeerEvaluationTeachingMemberOpen] = useState(false);

  const [isUpdatePeerEvaluationTeachingMemberOpen, setUpdatePeerEvaluationTeachingMemberOpen] = useState(false);

  const [isDeletePeerEvaluationTeachingMemberConfirmationOpen, setDeletePeerEvaluationTeachingMemberConfirmationOpen] =
    useState(false);

  const [deletePeerEvaluationTeachingMember, setDeletePeerEvaluationTeachingMember] =
    useState<PeerEvaluationTeachingMember | null>(null);

  const [updatePeerEvaluationTeachingMember, setUpdatePeerEvaluationTeachingMember] =
    useState<PeerEvaluationTeachingMember | null>(null);

  const [isCurrentUserPeerEvaluationOwner, setCurrentUserPeerEvaluationOwner] = useState<boolean>(false);

  const [selectedRows, setSelectedRows] = useState([]);

  const isError = meta.error != undefined;

  const isOwnerPeerEvaluationTeachingMemberChangeAllow = (role: PeerEvaluationTeachingMemberRoles) =>
    !isCurrentUserPeerEvaluationOwner && role === PeerEvaluationTeachingMemberRoles.OWNER;

  const onAddPeerEvaluationTeachingMember = () => {
    setCreatePeerEvaluationTeachingMemberOpen(true);
  };

  const onSubmitAddPeerEvaluationTeachingMember = (data: PeerEvaluationTeachingMember) => {
    setCurrentPeerEvaluationTeachingMembers([...currentPeerEvaluationTeachingMembers, data]);
  };

  const onPeerEvaluationTeachingMemberUpdateSelection = (data: ArrayObject) => {
    const dataRow = getMergedKeyValuesObject(
      peerEvaluationTeachingMemberDataTableColumnOrder,
      data
    ) as unknown as PeerEvaluationTeachingMember;

    if (isOwnerPeerEvaluationTeachingMemberChangeAllow(dataRow.role)) {
      errorNotification("Whoops... You cannot edit an owner of a peer evaluation");
      setSelectedRows([]);
      return undefined;
    }

    setUpdatePeerEvaluationTeachingMember(dataRow);
    setUpdatePeerEvaluationTeachingMemberOpen(true);
  };

  const onSubmitUpdatePeerEvaluationTeachingMember = (data: PeerEvaluationTeachingMember) => {
    const columnsUnchanged = currentPeerEvaluationTeachingMembers.filter(({ email }) => email !== data.email);

    const columnToUpdate = currentPeerEvaluationTeachingMembers.filter(({ email }) => email === data.email);

    columnToUpdate[0] = data;

    if (columnToUpdate[0].status != FieldStatus.NEW) {
      columnToUpdate[0].status = FieldStatus.UPDATED;
    }

    setCurrentPeerEvaluationTeachingMembers([...columnsUnchanged, ...columnToUpdate]);

    setSelectedRows([]);
  };

  const resetPeerEvaluationTeachingMembers = () => {
    setFieldValue(name, meta.initialValue);
  };

  const onPeerEvaluationTeachingMemberDeleteSelection = (data: ArrayObject) => {
    const dataRow = getMergedKeyValuesObject(
      peerEvaluationTeachingMemberDataTableColumnOrder,
      data
    ) as unknown as PeerEvaluationTeachingMember;

    if (isOwnerPeerEvaluationTeachingMemberChangeAllow(dataRow.role)) {
      errorNotification("Whoops... You cannot delete an owner of a peer evaluation");
      setSelectedRows([]);
      return undefined;
    }

    setDeletePeerEvaluationTeachingMember(dataRow);
    setDeletePeerEvaluationTeachingMemberConfirmationOpen(true);
  };

  const onDeletePeerEvaluationTeachingMemberAccept = () => {
    const columnsUnchanged = currentPeerEvaluationTeachingMembers.filter(
      ({ email }) => email !== deletePeerEvaluationTeachingMember?.email
    );

    const columnToUpdate = currentPeerEvaluationTeachingMembers.filter(
      ({ email }) => email === deletePeerEvaluationTeachingMember?.email
    );

    if (columnToUpdate[0].status != FieldStatus.NEW) {
      columnToUpdate[0].status = FieldStatus.DELETED;
      setCurrentPeerEvaluationTeachingMembers([...columnsUnchanged, ...columnToUpdate]);
    } else {
      setCurrentPeerEvaluationTeachingMembers(columnsUnchanged);
    }

    setSelectedRows([]);
    setDeletePeerEvaluationTeachingMemberConfirmationOpen(false);
  };

  const onDeletePeerEvaluationTeachingMemberCancel = () => {
    onDeletePeerEvaluationTeachingMemberConfirmationClose();
  };

  const onDeletePeerEvaluationTeachingMemberConfirmationClose = () => {
    setDeletePeerEvaluationTeachingMember(null);
    setDeletePeerEvaluationTeachingMemberConfirmationOpen(false);
  };

  const tableColumns: MUIDataTableColumnDef[] = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        filterType: "dropdown",
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        display: "excluded",
        filter: false,
      },
    },
    {
      name: "id",
      label: "ID",
      options: {
        display: "excluded",
        filter: false,
      },
    },
  ];

  const tableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no teaching peer evaluation teaching members in the peer evaluation",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: isDisabled ? "none" : "single",
    selectableRowsHeader: true,
    rowHover: true,
    download: false,
    draggableColumns: {
      enabled: true,
    },
    search: true,
    viewColumns: false,
    print: false,
    rowsPerPage: 100,
    customToolbar: (_) =>
      !isDisabled && (
        <DataTableAddActionButtonIcon
          onClick={onAddPeerEvaluationTeachingMember}
          testId={"peer-evaluation-member-add"}
          toolTipLabel={"Add"}
        />
      ),
    rowsSelected: selectedRows,
    onRowSelectionChange: (_, __, rowsSelected) => {
      setSelectedRows(rowsSelected as []);
    },
    customToolbarSelect: (selectedRows, displayData) => (
      <DataTableEditDeleteToolbar
        editButton={{
          testId: "peer-evaluation-member-update",
          toolTipLabel: "Update peer evaluation teaching member",
          onClick: () => onPeerEvaluationTeachingMemberUpdateSelection(displayData[selectedRows.data[0].index].data),
        }}
        deleteButton={{
          testId: "peer-evaluation-member-delete",
          toolTipLabel: "Delete peer evaluation teaching member",
          onClick: () => onPeerEvaluationTeachingMemberDeleteSelection(displayData[selectedRows.data[0].index].data),
        }}
      />
    ),
  };

  useEffect(() => {
    const filterPeerEvaluationTeachingMembersAvailable = (data: User[]) => {
      let peerEvaluationTeachingMembersAvailable = data;

      for (const currentPeerEvaluationTeachingMember of meta.value) {
        peerEvaluationTeachingMembersAvailable = peerEvaluationTeachingMembersAvailable.filter(
          ({ email }) => email !== currentPeerEvaluationTeachingMember.email
        );
      }

      setPeerEvaluationTeachingMembersAvailable(peerEvaluationTeachingMembersAvailable);
    };

    const isUserPeerEvaluationOwner = () => {
      if (session?.user.role == Role.ADMIN) {
        return true;
      }

      const listOfPeerEvaluationTeachingMembers = meta.value as PeerEvaluationTeachingMember[];

      const userPeerEvaluationTeachingMember = listOfPeerEvaluationTeachingMembers.filter(
        ({ email }) => email === session?.user.email
      );

      if (userPeerEvaluationTeachingMember.length) {
        return userPeerEvaluationTeachingMember[0].role === PeerEvaluationTeachingMemberRoles.OWNER;
      }

      return false;
    };

    if (data && !loading) {
      const listOfUsers = data.users;

      filterPeerEvaluationTeachingMembersAvailable(listOfUsers);
      setCurrentUserPeerEvaluationOwner(isUserPeerEvaluationOwner());
      // IsOnlyViewPeerEvaluationTeachingMember()
    }
  }, [data, session, loading, meta.value]);

  useEffect(() => {
    setFieldValue(name, currentPeerEvaluationTeachingMembers);
  }, [currentPeerEvaluationTeachingMembers, name, setFieldValue]);

  useEffect(() => {
    const sanitizeDataTable = () => {
      const data = meta.value as PeerEvaluationTeachingMember[];

      const dataFilteredByNotDelete = data.filter((item) => item.status !== FieldStatus.DELETED);
      setDataTablePeerEvaluationTeachingMembers(dataFilteredByNotDelete);
    };

    sanitizeDataTable();
  }, [meta.value]);

  if (loading && peerEvaluationTeachingMembersAvailable) {
    return <LoadingContainer loading={loading} centeredAbsolute={false} />;
  }

  if (errorRequest) {
    return <Error />;
  }

  return (
    <FormControl error={isError} variant="standard" fullWidth data-testid={testId}>
      <DataTable
        testId={`${testId}-datatable`}
        isVisible
        title={"Peer Evaluation Teaching Members"}
        data={dataTablePeerEvaluationTeachingMembers}
        columns={tableColumns}
        options={tableOptions}
      />

      <CreatePeerEvaluationTeachingMemberForm
        state={isCreatePeerEvaluationTeachingMemberOpen}
        updateFormState={setCreatePeerEvaluationTeachingMemberOpen}
        onSubmit={onSubmitAddPeerEvaluationTeachingMember}
        users={peerEvaluationTeachingMembersAvailable}
      />

      {updatePeerEvaluationTeachingMember && (
        <UpdatePeerEvaluationTeachingMemberForm
          state={isUpdatePeerEvaluationTeachingMemberOpen}
          updateFormState={setUpdatePeerEvaluationTeachingMemberOpen}
          onSubmit={onSubmitUpdatePeerEvaluationTeachingMember}
          users={peerEvaluationTeachingMembersAvailable}
          updatePeerEvaluationTeachingMember={updatePeerEvaluationTeachingMember}
          isPeerEvaluationTeachingMemberOwner={isCurrentUserPeerEvaluationOwner}
        />
      )}

      <FormHelperText>{isError ? meta.error : helperText}</FormHelperText>

      <Wrapper>
        <BottomRight>
          <Button
            size="small"
            disabled={isDisabled}
            onClick={resetPeerEvaluationTeachingMembers}
            testId={`${testId}-reset-button`}
            variant={"outlined"}
          >
            {content.containers.peerEvaluationTeachingMember.resetButton}
          </Button>
        </BottomRight>
      </Wrapper>

      <ConfirmationDialog
        testId={"peer-evaluation-member-confirmation-delete"}
        isOpen={isDeletePeerEvaluationTeachingMemberConfirmationOpen}
        title={content.containers.peerEvaluationTeachingMember.confirmationDeleteColumn.title}
        textContent={content.containers.peerEvaluationTeachingMember.confirmationDeleteColumn.bodyText}
        onAccept={onDeletePeerEvaluationTeachingMemberAccept}
        onClose={onDeletePeerEvaluationTeachingMemberCancel}
        closeText={content.containers.peerEvaluationTeachingMember.confirmationDeleteColumn.closeText}
        acceptText={content.containers.peerEvaluationTeachingMember.confirmationDeleteColumn.acceptText}
      />
    </FormControl>
  );
};

export default PeerEvaluationTeachingMemberFormWrapper;
