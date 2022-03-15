import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { FormControl, FormHelperText, Grid } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";

import { ConfirmationDialog, DataTable, DataTableAddColumnToolbarIcon, IconButtonWrapper } from "@/components";
import Button from "@/components/Button/Button";
import CreateModuleMemberForm from "@/containers/CreateModuleMemberForm";
import LoadingContainer from "@/containers/LoadingContainer";
import UpdateModuleMemberForm from "@/containers/UpdateModuleMemberForm";
import content from "@/content";
import { DeleteIcon, EditIcon } from "@/icons";
import useGetLecturerUsers from "@/requests/hooks/query/useGetLecturerUsers";
import { ModuleMember, moduleMemberColumnOrder } from "@/types/module";
import { ArrayObject } from "@/types/object";
import { IUserData } from "@/types/user";
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

const ModuleMemberContainer = ({ testId, helperText, name }: IModuleMemberContainer) => {
  // List of users from the backend

  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, error } = useGetLecturerUsers();

  const [currentModuleMembers, setCurrentModuleMembers] = useState<ModuleMember[]>(field.value);

  const [moduleMembersAvailable, setModuleMembersAvailable] = useState<IUserData[]>([]);

  const [isCreateModuleMemberOpen, setCreateModuleMemberOpen] = useState(false);

  const [isUpdateModuleMemberOpen, setUpdateModuleMemberOpen] = useState(false);

  const [isDeleteModuleMemberConfirmationOpen, setDeleteModuleMemberConfirmationOpen] = useState(false);

  const [deleteModuleMember, setDeleteModuleMember] = useState<ModuleMember | null>(null);

  const [updateModuleMember, setUpdateModuleMember] = useState<ModuleMember | null>(null);

  const [selectedRows, setSelectedRows] = useState([]);

  const isError = meta.error != undefined;

  const onAddModuleMember = () => {
    setCreateModuleMemberOpen(true);
  };

  const onSubmitAddModuleMember = (data: ModuleMember) => {
    setCurrentModuleMembers([...currentModuleMembers, data]);
  };

  const onModuleMemberUpdateSelection = (data: ArrayObject) => {
    const dataRow = getMergedKeyValuesObject(moduleMemberColumnOrder, data) as unknown as ModuleMember;
    setUpdateModuleMember(dataRow);
    setUpdateModuleMemberOpen(true);
  };

  // TODO - Block Lecturer main account
  const onSubmitUpdateModuleMember = (data: ModuleMember) => {
    const columnsUnchanged = currentModuleMembers.filter(({ email }) => email !== data.email);

    const columnToUpdate = currentModuleMembers.filter(({ email }) => email === data.email);

    columnToUpdate[0] = data;

    setCurrentModuleMembers([...columnsUnchanged, ...columnToUpdate]);

    setSelectedRows([]);
  };

  const resetModuleMembers = () => {
    setFieldValue(name, meta.initialValue);
  };

  const onModuleMemberDeleteSelection = (data: ArrayObject) => {
    const dataRow = getMergedKeyValuesObject(moduleMemberColumnOrder, data) as unknown as ModuleMember;
    setDeleteModuleMember(dataRow);
    setDeleteModuleMemberConfirmationOpen(true);
  };

  const onDeleteModuleMemberAccept = () => {
    const columnsUnchanged = currentModuleMembers.filter(({ email }) => email !== deleteModuleMember?.email);

    setCurrentModuleMembers([...columnsUnchanged]);
    setDeleteModuleMemberConfirmationOpen(false);
    setSelectedRows([]);
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
    if (data) {
      let moduleMembersAvailable = data.users;

      for (const currentModuleMember of meta.value) {
        moduleMembersAvailable = moduleMembersAvailable.filter(({ email }) => email !== currentModuleMember.email);
      }
      setModuleMembersAvailable(moduleMembersAvailable);
    }
  }, [data, meta.value]);

  useEffect(() => {
    setFieldValue(name, currentModuleMembers);
  }, [currentModuleMembers, name, setFieldValue]);

  if (loading && moduleMembersAvailable) {
    return <LoadingContainer loading={loading} />;
  }

  return (
    <FormControl error={isError} variant="standard" fullWidth data-testid={testId}>
      <DataTable
        testId={`${testId}-datatable`}
        isVisible
        title={"Module members"}
        data={[...meta.value]}
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

export default ModuleMemberContainer;
