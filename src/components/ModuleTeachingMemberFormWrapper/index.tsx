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
  DataTableAddColumnToolbarIcon,
  Error,
  IconButtonWrapper,
} from "@/components";
import CreateModuleTeachingMemberForm from "@/containers/CreateModuleTeachingMemberForm";
import LoadingContainer from "@/containers/LoadingContainer";
import UpdateModuleTeachingMemberForm from "@/containers/UpdateModuleTeachingMemberForm";
import content from "@/content";
import { DeleteIcon, EditIcon } from "@/icons";
import useGetLecturerUsers from "@/requests/hooks/query/useGetLecturerUsers";
import {
  FieldStatus,
  ModuleTeachingMember,
  ModuleTeachingMemberRoles,
  moduleTeachingMemberDataTableColumnOrder,
} from "@/types/module";
import { ArrayObject } from "@/types/object";
import { Role, errorNotification } from "@/utils";
import { getMergedKeyValuesObject } from "@/utils/form";

interface IModuleTeachingMemberContainer {
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

const ModuleTeachingMemberFormWrapper = ({ testId, helperText, name, isDisabled }: IModuleTeachingMemberContainer) => {
  const { data: session } = useSession();

  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);

  const { data, loading, error: errorRequest } = useGetLecturerUsers();

  const [dataTableModuleTeachingMembers, setDataTableModuleTeachingMembers] = useState<ModuleTeachingMember[]>(
    meta.value
  );

  const [currentModuleTeachingMembers, setCurrentModuleTeachingMembers] = useState<ModuleTeachingMember[]>(field.value);

  const [moduleTeachingMembersAvailable, setModuleTeachingMembersAvailable] = useState<User[]>([]);

  const [isCreateModuleTeachingMemberOpen, setCreateModuleTeachingMemberOpen] = useState(false);

  const [isUpdateModuleTeachingMemberOpen, setUpdateModuleTeachingMemberOpen] = useState(false);

  const [isDeleteModuleTeachingMemberConfirmationOpen, setDeleteModuleTeachingMemberConfirmationOpen] = useState(false);

  const [deleteModuleTeachingMember, setDeleteModuleTeachingMember] = useState<ModuleTeachingMember | null>(null);

  const [updateModuleTeachingMember, setUpdateModuleTeachingMember] = useState<ModuleTeachingMember | null>(null);

  const [isCurrentUserModuleOwner, setCurrentUserModuleOwner] = useState<boolean>(false);

  const [selectedRows, setSelectedRows] = useState([]);

  const isError = meta.error != undefined;

  const isOwnerModuleTeachingMemberChangeAllow = (role: ModuleTeachingMemberRoles) =>
    !isCurrentUserModuleOwner && role === ModuleTeachingMemberRoles.OWNER;

  const onAddModuleTeachingMember = () => {
    setCreateModuleTeachingMemberOpen(true);
  };

  const onSubmitAddModuleTeachingMember = (data: ModuleTeachingMember) => {
    setCurrentModuleTeachingMembers([...currentModuleTeachingMembers, data]);
  };

  const onModuleTeachingMemberUpdateSelection = (data: ArrayObject) => {
    const dataRow = getMergedKeyValuesObject(
      moduleTeachingMemberDataTableColumnOrder,
      data
    ) as unknown as ModuleTeachingMember;

    if (isOwnerModuleTeachingMemberChangeAllow(dataRow.role)) {
      errorNotification("Whoops... You cannot edit an owner of a module");
      setSelectedRows([]);
      return undefined;
    }

    setUpdateModuleTeachingMember(dataRow);
    setUpdateModuleTeachingMemberOpen(true);
  };

  const onSubmitUpdateModuleTeachingMember = (data: ModuleTeachingMember) => {
    const columnsUnchanged = currentModuleTeachingMembers.filter(({ email }) => email !== data.email);

    const columnToUpdate = currentModuleTeachingMembers.filter(({ email }) => email === data.email);

    columnToUpdate[0] = data;

    if (columnToUpdate[0].status != FieldStatus.NEW) {
      columnToUpdate[0].status = FieldStatus.UPDATED;
    }

    setCurrentModuleTeachingMembers([...columnsUnchanged, ...columnToUpdate]);

    setSelectedRows([]);
  };

  const resetModuleTeachingMembers = () => {
    setFieldValue(name, meta.initialValue);
  };

  const onModuleTeachingMemberDeleteSelection = (data: ArrayObject) => {
    const dataRow = getMergedKeyValuesObject(
      moduleTeachingMemberDataTableColumnOrder,
      data
    ) as unknown as ModuleTeachingMember;

    if (isOwnerModuleTeachingMemberChangeAllow(dataRow.role)) {
      errorNotification("Whoops... You cannot delete an owner of a module");
      setSelectedRows([]);
      return undefined;
    }

    setDeleteModuleTeachingMember(dataRow);
    setDeleteModuleTeachingMemberConfirmationOpen(true);
  };

  const onDeleteModuleTeachingMemberAccept = () => {
    const columnsUnchanged = currentModuleTeachingMembers.filter(
      ({ email }) => email !== deleteModuleTeachingMember?.email
    );

    const columnToUpdate = currentModuleTeachingMembers.filter(
      ({ email }) => email === deleteModuleTeachingMember?.email
    );

    if (columnToUpdate[0].status != FieldStatus.NEW) {
      columnToUpdate[0].status = FieldStatus.DELETED;
      setCurrentModuleTeachingMembers([...columnsUnchanged, ...columnToUpdate]);
    } else {
      setCurrentModuleTeachingMembers(columnsUnchanged);
    }

    setSelectedRows([]);
    setDeleteModuleTeachingMemberConfirmationOpen(false);
  };

  const onDeleteModuleTeachingMemberCancel = () => {
    onDeleteModuleTeachingMemberConfirmationClose();
  };

  const onDeleteModuleTeachingMemberConfirmationClose = () => {
    setDeleteModuleTeachingMember(null);
    setDeleteModuleTeachingMemberConfirmationOpen(false);
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
        noMatch: "Sorry, no teaching module teaching members in the module",
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
      !isDisabled && <DataTableAddColumnToolbarIcon onClick={onAddModuleTeachingMember} testId={"module-member-add"} />,
    rowsSelected: selectedRows,
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      setSelectedRows(rowsSelected as []);
    },
    customToolbarSelect: (selectedRows, displayData) => (
      <Grid container direction="row" justifyContent="flex-end" alignItems="center">
        <IconButtonWrapper
          testId="module-member-update"
          tooltip={"Update module teaching member"}
          onClick={() => onModuleTeachingMemberUpdateSelection(displayData[selectedRows.data[0].index].data)}
        >
          <EditIcon testId={"module-member-update-button-icon"} />
        </IconButtonWrapper>
        <IconButtonWrapper
          testId="module-member-delete"
          tooltip={"Update module teaching member"}
          onClick={() => onModuleTeachingMemberDeleteSelection(displayData[selectedRows.data[0].index].data)}
        >
          <DeleteIcon testId={"module-member-delete-button-icon"} />
        </IconButtonWrapper>
      </Grid>
    ),
  };

  useEffect(() => {
    const filterModuleTeachingMembersAvailable = (data: User[]) => {
      let moduleTeachingMembersAvailable = data;

      for (const currentModuleTeachingMember of meta.value) {
        moduleTeachingMembersAvailable = moduleTeachingMembersAvailable.filter(
          ({ email }) => email !== currentModuleTeachingMember.email
        );
      }

      setModuleTeachingMembersAvailable(moduleTeachingMembersAvailable);
    };

    const isUserModuleOwner = () => {
      if (session?.user.role == Role.ADMIN) {
        return true;
      }

      const listOfModuleTeachingMembers = meta.value as ModuleTeachingMember[];

      const userModuleTeachingMember = listOfModuleTeachingMembers.filter(({ email }) => email === session?.user.email);

      if (userModuleTeachingMember.length) {
        return userModuleTeachingMember[0].role === ModuleTeachingMemberRoles.OWNER;
      }

      return false;
    };

    if (data && !loading) {
      const listOfUsers = data.users;

      filterModuleTeachingMembersAvailable(listOfUsers);
      setCurrentUserModuleOwner(isUserModuleOwner());
      // IsOnlyViewModuleTeachingMember()
    }
  }, [data, session, loading, meta.value]);

  useEffect(() => {
    setFieldValue(name, currentModuleTeachingMembers);
  }, [currentModuleTeachingMembers, name, setFieldValue]);

  useEffect(() => {
    const sanitizeDataTable = () => {
      const data = meta.value as ModuleTeachingMember[];

      const dataFilteredByNotDelete = data.filter((item) => item.status !== FieldStatus.DELETED);
      setDataTableModuleTeachingMembers(dataFilteredByNotDelete);
    };

    sanitizeDataTable();
  }, [meta.value]);

  if (loading && moduleTeachingMembersAvailable) {
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
        title={"Module Teaching Members"}
        data={dataTableModuleTeachingMembers}
        columns={tableColumns}
        options={tableOptions}
      />

      <CreateModuleTeachingMemberForm
        state={isCreateModuleTeachingMemberOpen}
        updateFormState={setCreateModuleTeachingMemberOpen}
        onSubmit={onSubmitAddModuleTeachingMember}
        users={moduleTeachingMembersAvailable}
      />

      {updateModuleTeachingMember && (
        <UpdateModuleTeachingMemberForm
          state={isUpdateModuleTeachingMemberOpen}
          updateFormState={setUpdateModuleTeachingMemberOpen}
          onSubmit={onSubmitUpdateModuleTeachingMember}
          users={moduleTeachingMembersAvailable}
          updateModuleTeachingMember={updateModuleTeachingMember}
          isModuleTeachingMemberOwner={isCurrentUserModuleOwner}
        />
      )}

      <FormHelperText>{isError ? meta.error : helperText}</FormHelperText>

      <Wrapper>
        <BottomRight>
          <Button
            size="small"
            disabled={isDisabled}
            onClick={resetModuleTeachingMembers}
            testId={`${testId}-reset-button`}
            variant={"outlined"}
          >
            {content.containers.moduleTeachingMember.resetButton}
          </Button>
        </BottomRight>
      </Wrapper>

      <ConfirmationDialog
        testId={"module-member-confirmation-delete"}
        isOpen={isDeleteModuleTeachingMemberConfirmationOpen}
        title={content.containers.moduleTeachingMember.confirmationDeleteColumn.title}
        textContent={content.containers.moduleTeachingMember.confirmationDeleteColumn.bodyText}
        onAccept={onDeleteModuleTeachingMemberAccept}
        onClose={onDeleteModuleTeachingMemberCancel}
        closeText={content.containers.moduleTeachingMember.confirmationDeleteColumn.closeText}
        acceptText={content.containers.moduleTeachingMember.confirmationDeleteColumn.acceptText}
      />
    </FormControl>
  );
};

export default ModuleTeachingMemberFormWrapper;
