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
import CreateModuleMemberForm from "@/containers/CreateModuleMemberForm";
import LoadingContainer from "@/containers/LoadingContainer";
import UpdateModuleMemberForm from "@/containers/UpdateModuleMemberForm/UpdateModuleMemberForm";
import content from "@/content";
import { DeleteIcon, EditIcon } from "@/icons";
import useGetLecturerUsers from "@/requests/hooks/query/useGetLecturerUsers";
import { FieldStatus, ModuleMember, ModuleMemberPermissions, moduleMemberDataTableColumnOrder } from "@/types/module";
import { ArrayObject } from "@/types/object";
import { IUserData } from "@/types/user";
import { Role, errorNotification } from "@/utils";
import { getMergedKeyValuesObject } from "@/utils/form";

interface IModuleMemberContainer {
  helperText: string;
  testId: string;
  name: string;
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

const ModuleMemberFormWrapper = ({ testId, helperText, name }: IModuleMemberContainer) => {
  const { data: session } = useSession();

  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);

  const { data, loading, error: errorRequest } = useGetLecturerUsers();

  const [dataTableModuleMembers, setDataTableModuleMembers] = useState<ModuleMember[]>(meta.value);

  const [currentModuleMembers, setCurrentModuleMembers] = useState<ModuleMember[]>(field.value);

  const [moduleMembersAvailable, setModuleMembersAvailable] = useState<User[]>([]);

  const [isCreateModuleMemberOpen, setCreateModuleMemberOpen] = useState(false);

  const [isUpdateModuleMemberOpen, setUpdateModuleMemberOpen] = useState(false);

  const [isDeleteModuleMemberConfirmationOpen, setDeleteModuleMemberConfirmationOpen] = useState(false);

  const [deleteModuleMember, setDeleteModuleMember] = useState<ModuleMember | null>(null);

  const [updateModuleMember, setUpdateModuleMember] = useState<ModuleMember | null>(null);

  const [isCurrentUserModuleOwner, setCurrentUserModuleOwner] = useState<boolean>(false);

  const [selectedRows, setSelectedRows] = useState([]);

  const isError = meta.error != undefined;

  const isOwnerModuleMemberChangeAllow = (permission: ModuleMemberPermissions) =>
    !isCurrentUserModuleOwner && permission === ModuleMemberPermissions.OWNER;

  const onAddModuleMember = () => {
    setCreateModuleMemberOpen(true);
  };

  const onSubmitAddModuleMember = (data: ModuleMember) => {
    setCurrentModuleMembers([...currentModuleMembers, data]);
  };

  const onModuleMemberUpdateSelection = (data: ArrayObject) => {
    const dataRow = getMergedKeyValuesObject(moduleMemberDataTableColumnOrder, data) as unknown as ModuleMember;

    if (isOwnerModuleMemberChangeAllow(dataRow.permission)) {
      errorNotification("Whoops... You cannot edit an owner of a module");
      setSelectedRows([]);
      return undefined;
    }

    setUpdateModuleMember(dataRow);
    setUpdateModuleMemberOpen(true);
  };

  const onSubmitUpdateModuleMember = (data: ModuleMember) => {
    const columnsUnchanged = currentModuleMembers.filter(({ email }) => email !== data.email);

    const columnToUpdate = currentModuleMembers.filter(({ email }) => email === data.email);

    columnToUpdate[0] = data;

    if (columnToUpdate[0].status != FieldStatus.NEW) {
      columnToUpdate[0].status = FieldStatus.UPDATED;
    }

    setCurrentModuleMembers([...columnsUnchanged, ...columnToUpdate]);

    setSelectedRows([]);
  };

  const resetModuleMembers = () => {
    setFieldValue(name, meta.initialValue);
  };

  const onModuleMemberDeleteSelection = (data: ArrayObject) => {
    const dataRow = getMergedKeyValuesObject(moduleMemberDataTableColumnOrder, data) as unknown as ModuleMember;

    if (isOwnerModuleMemberChangeAllow(dataRow.permission)) {
      errorNotification("Whoops... You cannot delete an owner of a module");
      setSelectedRows([]);
      return undefined;
    }

    setDeleteModuleMember(dataRow);
    setDeleteModuleMemberConfirmationOpen(true);
  };

  const onDeleteModuleMemberAccept = () => {
    const columnsUnchanged = currentModuleMembers.filter(({ email }) => email !== deleteModuleMember?.email);

    const columnToUpdate = currentModuleMembers.filter(({ email }) => email === deleteModuleMember?.email);

    if (columnToUpdate[0].status != FieldStatus.NEW) {
      columnToUpdate[0].status = FieldStatus.DELETED;
      setCurrentModuleMembers([...columnsUnchanged, ...columnToUpdate]);
    } else {
      setCurrentModuleMembers(columnsUnchanged);
    }

    setSelectedRows([]);
    setDeleteModuleMemberConfirmationOpen(false);
  };

  const onDeleteModuleMemberCancel = () => {
    onDeleteModuleMemberConfirmationClose();
  };

  const onDeleteModuleMemberConfirmationClose = () => {
    setDeleteModuleMember(null);
    setDeleteModuleMemberConfirmationOpen(false);
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
      name: "permission",
      label: "Permission",
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
        filter: true,
        sort: true,
        filterType: "dropdown",
      },
    },
  ];

  const tableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no module members in the module",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "single",
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
    customToolbar: (_) => <DataTableAddColumnToolbarIcon onClick={onAddModuleMember} testId={"module-member-add"} />,
    rowsSelected: selectedRows,
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      setSelectedRows(rowsSelected as []);
    },
    customToolbarSelect: (selectedRows, displayData) => (
      <Grid container direction="row" justifyContent="flex-end" alignItems="center">
        <IconButtonWrapper
          testId="module-member-update"
          tooltip={"Update module member"}
          onClick={() => onModuleMemberUpdateSelection(displayData[selectedRows.data[0].index].data)}
        >
          <EditIcon testId={"module-member-update-button-icon"} />
        </IconButtonWrapper>
        <IconButtonWrapper
          testId="module-member-delete"
          tooltip={"Update module member"}
          onClick={() => onModuleMemberDeleteSelection(displayData[selectedRows.data[0].index].data)}
        >
          <DeleteIcon testId={"module-member-delete-button-icon"} />
        </IconButtonWrapper>
      </Grid>
    ),
  };

  useEffect(() => {
    const filterModuleMembersAvailable = (data: User[]) => {
      let moduleMembersAvailable = data;

      for (const currentModuleMember of meta.value) {
        moduleMembersAvailable = moduleMembersAvailable.filter(({ email }) => email !== currentModuleMember.email);
      }

      setModuleMembersAvailable(moduleMembersAvailable);
    };

    const isUserModuleOwner = () => {
      if (session?.user.role == Role.ADMIN) {
        return true;
      }

      const listOfModuleMembers = meta.value as ModuleMember[];

      const userModuleMember = listOfModuleMembers.filter(({ email }) => email === session?.user.email);

      if (userModuleMember.length) {
        return userModuleMember[0].permission === ModuleMemberPermissions.OWNER;
      }

      return false;
    };

    if (data && !loading) {
      const listOfUsers = data.users;

      filterModuleMembersAvailable(listOfUsers);
      setCurrentUserModuleOwner(isUserModuleOwner());
    }
  }, [data, session, loading, meta.value]);

  useEffect(() => {
    setFieldValue(name, currentModuleMembers);
  }, [currentModuleMembers, name, setFieldValue]);

  useEffect(() => {
    const sanitizeDataTable = () => {
      const data = meta.value as ModuleMember[];

      const dataFilteredByNotDelete = data.filter((item) => item.status !== FieldStatus.DELETED);
      setDataTableModuleMembers(dataFilteredByNotDelete);
    };

    sanitizeDataTable();
  }, [meta.value]);

  if (loading && moduleMembersAvailable) {
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
        title={"Module members"}
        data={dataTableModuleMembers}
        columns={tableColumns}
        options={tableOptions}
      />

      <CreateModuleMemberForm
        state={isCreateModuleMemberOpen}
        updateFormState={setCreateModuleMemberOpen}
        onSubmit={onSubmitAddModuleMember}
        users={moduleMembersAvailable}
      />

      {updateModuleMember && (
        <UpdateModuleMemberForm
          state={isUpdateModuleMemberOpen}
          updateFormState={setUpdateModuleMemberOpen}
          onSubmit={onSubmitUpdateModuleMember}
          users={moduleMembersAvailable}
          updateModuleMember={updateModuleMember}
          isModuleMemberOwner={isCurrentUserModuleOwner}
        />
      )}

      <FormHelperText>{isError ? meta.error : helperText}</FormHelperText>

      <Wrapper>
        <BottomRight>
          <Button size="small" onClick={resetModuleMembers} testId={`${testId}-reset-button`} variant={"outlined"}>
            {content.containers.moduleMember.resetButton}
          </Button>
        </BottomRight>
      </Wrapper>

      <ConfirmationDialog
        testId={"module-member-confirmation-delete"}
        isOpen={isDeleteModuleMemberConfirmationOpen}
        title={content.containers.moduleMember.confirmationDeleteColumn.title}
        textContent={content.containers.moduleMember.confirmationDeleteColumn.bodyText}
        onAccept={onDeleteModuleMemberAccept}
        onClose={onDeleteModuleMemberCancel}
        closeText={content.containers.moduleMember.confirmationDeleteColumn.closeText}
        acceptText={content.containers.moduleMember.confirmationDeleteColumn.acceptText}
      />
    </FormControl>
  );
};

export default ModuleMemberFormWrapper;
