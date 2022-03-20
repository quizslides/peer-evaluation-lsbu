import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import styled from "@emotion/styled";
import { ModuleMember } from "@generated/type-graphql";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
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
import useGetModules from "@/requests/hooks/query/useGetModules";
import useGetModulesByLecturer from "@/requests/hooks/query/useGetModulesByLecturer";
import routing from "@/routing";
import {
  IModuleDataTable,
  ModuleMemberPermissions,
  Schools,
  SchoolsDataTable,
  SchoolsDropdown,
  moduleDataTableColumnOrder,
} from "@/types/module";
import { RoleScope, errorNotification, loadingNotification, successNotification } from "@/utils";

const Container = styled.div`
  margin-right: 2em;
`;

const Modules: NextPage = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const apolloClient = useApolloClient();

  const [module, { loading: loadingQuery, error, data, refetch: runRefreshModules }] =
    useGetModulesByLecturer("AllModules");

  const loading = status === "loading" || loadingQuery;

  const [isRedirecting, setRedirecting] = useState(false);

  const [modulesData, setModulesData] = useState<IModuleDataTable[]>([]);

  useEffect(() => {
    if (data) {
      let moduleData = data?.moduleByLecturer as unknown as IModuleDataTable[];
      for (let index in moduleData) {
        moduleData[index].schoolsDataTable = moduleData[index].schools.map(
          (school) => SchoolsDropdown[school]
        ) as Schools[];
      }

      setModulesData(moduleData);
    }
  }, [data]);

  const getModuleObject = (values: string[]) => {
    return moduleDataTableColumnOrder.reduce((obj, column, index) => {
      return { ...obj, [column]: values[index] };
    }, {}) as IModuleDataTable;
  };

  const onRefreshModules = async () => {
    loadingNotification("Refreshing modules", "AllModules");
    try {
      await runRefreshModules();
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
        redirectUrl: routing.admin.modules,
      },
    });
  };

  const onEditModule = (values: string[]) => {
    const moduleToUpdate = getModuleObject(values);
    setRedirecting(true);
    router.push({
      pathname: `${routing.modules.edit}/${moduleToUpdate.id}`,
      query: {
        redirectUrl: routing.modules.list,
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
        await runRefreshModules();
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
        noMatch: "Sorry, no modules in the system",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "single",
    selectableRowsHeader: true,
    rowHover: true,
    download: true,
    downloadOptions: {
      filename: `admin_modules-${new Date().getTime()}.csv`,
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
        <DataTableRefreshToolbarIcon onClick={onRefreshModules} testId={"refresh-admin-module-table"} />
        <DataTableAddColumnToolbarIcon onClick={onAddModule} testId={"module-member-add"} />
      </>
    ),
    customToolbarSelect: (selectedRows, displayData) => (
      <Container>
        <IconButtonWrapper
          testId="update-user-button-wrapper"
          tooltip={"Update"}
          onClick={() => onEditModule(displayData[selectedRows.data[0].index].data)}
        >
          <EditIcon testId={"update-user-button-icon"} />
        </IconButtonWrapper>
        <IconButtonWrapper
          testId="delete-user-button-wrapper"
          tooltip={"Delete"}
          onClick={() => onDeleteModuleConfirmation(displayData[selectedRows.data[0].index].data)}
        >
          <DeleteIcon testId={"delete-user-button-icon"} />
        </IconButtonWrapper>
      </Container>
    ),
  };

  useEffect(() => {
    if (session && session.user.email) {
      module({
        variables: {
          where: {
            email: session.user.email,
          },
        },
      });
    }
  }, [module, session]);

  return (
    <Base topLeftComponent="menu" loading={loading || isRedirecting} error={!!error}>
      <PageTitle title={"Modules"} testId="page-admin-modules-title" variant="h4" margin="2em" />
      <DataTable
        testId={"admin-modules-datatable"}
        isVisible={!!modulesData}
        title={""}
        data={modulesData}
        columns={tableColumns}
        options={tableOptions}
      />
      <ConfirmationDialog
        testId={"admin-modules-datatable-on-delete"}
        isOpen={isDeleteModuleOpen}
        title={content.pages.admin.module.confirmationOnDelete.title}
        textContent={content.pages.admin.module.confirmationOnDelete.bodyText}
        onAccept={onDeleteDialogAccept}
        onClose={onDeleteDialogClose}
        closeText={content.pages.admin.module.confirmationOnDelete.closeText}
        acceptText={content.pages.admin.module.confirmationOnDelete.acceptText}
      />
    </Base>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
};

export default Modules;
