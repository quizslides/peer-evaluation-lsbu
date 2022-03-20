import React, { useState } from "react";

import { useApolloClient } from "@apollo/client";
import styled from "@emotion/styled";
import { ModuleMember } from "@generated/type-graphql";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { Session } from "next-auth";
import { useRouter } from "next/router";

import {
  Base,
  ConfirmationDialog,
  DataTable,
  DataTableAddColumnToolbarIcon,
  DataTableRefreshToolbarIcon,
  IconButtonWrapper,
  PageTitle,
} from "@/components";
import content from "@/content";
import { DeleteIcon, EditIcon } from "@/icons";
import deleteModule from "@/requests/direct/mutation/deleteModule";
import routing from "@/routing";
import {
  IModuleDataTable,
  ModuleMemberPermissions,
  SchoolsDataTable,
  moduleDataTableColumnOrder,
} from "@/types/module";
import { errorNotification, loadingNotification, successNotification } from "@/utils";

const Container = styled.div`
  margin-right: 2em;
`;

interface IModulesDataTable {
  redirectUrl: string;
  isLoading: boolean;
  modulesData: IModuleDataTable[];
  isError: boolean;
  session: Session | null;
  testId: string;
  refreshModules: () => void;
}

const ModulesDataTable = ({
  redirectUrl,
  isLoading,
  modulesData,
  session,
  isError,
  testId,
  refreshModules,
}: IModulesDataTable) => {
  const router = useRouter();

  const apolloClient = useApolloClient();

  const [isRedirecting, setRedirecting] = useState(false);

  const getModuleObject = (values: string[]) => {
    return moduleDataTableColumnOrder.reduce((obj, column, index) => {
      return { ...obj, [column]: values[index] };
    }, {}) as IModuleDataTable;
  };

  const onRefreshModules = () => {
    loadingNotification("Refreshing modules", "AllModules");
    try {
      refreshModules();
      successNotification("Refreshed successfully", "AllModules");
    } catch (error) {
      errorNotification("Something went wrong", "AllModules");
    }
  };

  const onAddModule = () => {
    setRedirecting(true);

    router.push({
      pathname: routing.modules.create,
      query: {
        redirectUrl: redirectUrl,
      },
    });
  };

  const onEditModule = (values: string[]) => {
    const moduleToUpdate = getModuleObject(values);
    setRedirecting(true);
    router.push({
      pathname: `${routing.modules.edit}/${moduleToUpdate.id}`,
      query: {
        redirectUrl: redirectUrl,
      },
    });
  };

  const [isDeleteModuleOpen, setDeleteModuleConfirmationOpen] = useState(false);

  const [deleteModuleId, setDeleteModuleId] = useState<string | null>(null);

  const onDeleteModuleConfirmation = (values: string[]) => {
    const moduleToDelete = getModuleObject(values);

    const moduleDataToDelete = modulesData.filter((moduleData) => moduleData.id === moduleToDelete.id)[0];

    const moduleMembers = moduleDataToDelete.moduleMembers as unknown as ModuleMember[];

    const userDeletingModule = moduleMembers.filter((moduleMembers) => moduleMembers.userId === session?.user.id)[0];

    if (userDeletingModule.permission !== ModuleMemberPermissions.OWNER) {
      errorNotification("You do not have enough permissions to delete this module");
      return null;
    }

    setDeleteModuleConfirmationOpen(true);
    setDeleteModuleId(moduleToDelete.id);
  };

  const onDeleteDialogAccept = async () => {
    loadingNotification("Deleting module... Wait for it...", "DeletingModule");

    setDeleteModuleConfirmationOpen(false);
    setDeleteModuleId(null);

    if (deleteModuleId) {
      const { errors } = await deleteModule(apolloClient, deleteModuleId);

      if (!errors) {
        successNotification("Module deleted successfully", "DeletingModule");
        refreshModules();
      } else {
        // TODO: Create a granular error notification to the user with all the errors
        errorNotification("Error deleting module", "DeletingModule");
      }
    }
  };

  const onDeleteDialogClose = () => {
    setDeleteModuleConfirmationOpen(false);
    setDeleteModuleId(null);
  };

  const tableColumns: MUIDataTableColumnDef[] = [
    {
      name: "id",
      label: "ID",
      options: {
        display: "false",
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "createdAt",
      label: "Created",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
        customBodyRender: (date: string) => {
          return new Date(date).toLocaleString("en-GB");
        },
      },
    },
    {
      name: "updatedAt",
      label: "Updated",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
        customBodyRender: (date: string) => {
          return new Date(date).toLocaleString("en-GB");
        },
      },
    },
    {
      name: "moduleCode",
      label: "Module Code",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "maxGradeIncrease",
      label: "Max Grade Increase",
      options: {
        display: "false",
        filter: true,
        sort: true,
      },
    },
    {
      name: "maxGradeDecrease",
      label: "Max Grade Decrease",
      options: {
        display: "false",
        filter: true,
        sort: true,
      },
    },
    {
      name: "submissionsLockDate",
      label: "Submission Lock Date",
      options: {
        display: "false",
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "criteriaScoreRangeMin",
      label: "Criterial Score Range Min",
      options: {
        display: "false",
        filter: true,
        sort: true,
      },
    },
    {
      name: "criteriaScoreRangeMax",
      label: "Criterial Score Range Max",
      options: {
        display: "false",
        filter: true,
        sort: true,
      },
    },
    {
      name: "_count.moduleMembers",
      label: "Total Module Members",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "_count.columns",
      label: "Total Columns",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "_count.students",
      label: "Total students",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "schoolsDataTable",
      label: "Schools",
      options: {
        customBodyRender: (schools: string[]) => {
          return (
            <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
              {schools.map((school, index) => (
                <Chip key={index} label={SchoolsDataTable[school]} color="primary" size="small" />
              ))}
            </Stack>
          );
        },
      },
    },
  ];

  const tableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no modules available",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "single",
    selectableRowsHeader: true,
    rowHover: true,
    download: true,
    downloadOptions: {
      filename: `modules-${new Date().getTime()}.csv`,
    },
    draggableColumns: {
      enabled: true,
    },
    print: false,
    rowsPerPage: 100,
    onTableChange: (action, tableState) => {
      if (action === "propsUpdate") {
        tableState.selectedRows.data = [];
        tableState.selectedRows.lookup = [];
      }
    },
    enableNestedDataAccess: ".",
    customToolbar: (_) => (
      <>
        <DataTableRefreshToolbarIcon onClick={onRefreshModules} testId={`${testId}-refresh-module-table`} />
        <DataTableAddColumnToolbarIcon onClick={onAddModule} testId={`${testId}-module-member-add`} />
      </>
    ),
    customToolbarSelect: (selectedRows, displayData) => (
      <Container>
        <IconButtonWrapper
          testId="update-user-button-wrapper"
          tooltip={"Update"}
          onClick={() => onEditModule(displayData[selectedRows.data[0].index].data)}
        >
          <EditIcon testId={`${testId}-update-user-button-icon`} />
        </IconButtonWrapper>
        <IconButtonWrapper
          testId="delete-user-button-wrapper"
          tooltip={"Delete"}
          onClick={() => onDeleteModuleConfirmation(displayData[selectedRows.data[0].index].data)}
        >
          <DeleteIcon testId={`${testId}-delete-user-button-icon`} />
        </IconButtonWrapper>
      </Container>
    ),
  };

  return (
    <Base topLeftComponent="menu" loading={isLoading || isRedirecting} error={isError}>
      <PageTitle title={"Modules"} testId={`${testId}-title`} variant="h4" margin="2em" />
      <DataTable
        testId={`${testId}-datatable`}
        isVisible={!!modulesData}
        title={""}
        data={modulesData}
        columns={tableColumns}
        options={tableOptions}
      />
      <ConfirmationDialog
        testId={`${testId}-datatable-on-delete`}
        isOpen={isDeleteModuleOpen}
        title={content.containers.modulesDataTable.confirmationOnDelete.title}
        textContent={content.containers.modulesDataTable.confirmationOnDelete.bodyText}
        onAccept={onDeleteDialogAccept}
        onClose={onDeleteDialogClose}
        closeText={content.containers.modulesDataTable.confirmationOnDelete.closeText}
        acceptText={content.containers.modulesDataTable.confirmationOnDelete.acceptText}
      />
    </Base>
  );
};

export default ModulesDataTable;
