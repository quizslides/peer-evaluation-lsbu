import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Base,
  DataTable,
  DataTableAddColumnToolbarIcon,
  DataTableRefreshToolbarIcon,
  IconButtonWrapper,
  PageTitle,
} from "@/components";
import { DeleteIcon, EditIcon } from "@/icons";
import useGetModules from "@/requests/hooks/query/useGetModules";
import routing from "@/routing";
import { SchoolAcronyms, Schools, SchoolsDropdown } from "@/types/module";
import { RoleScope, errorNotification, loadingNotification, successNotification } from "@/utils";

const Container = styled.div`
  margin-right: 2em;
`;

const Modules: NextPage = () => {
  const router = useRouter();

  const { data, loading, error, refetch: runRefreshModules } = useGetModules();

  const [isRedirecting, setRedirecting] = useState(false);

  // useEffect(() => {
  //   if (data) {
  //     let moduleData = data?.modules;

  //     for (let index in moduleData) {
  //       // if (module.columns) {
  //       // moduleData[index].schools = ;
  //       let schools = moduleData[index].schools.map((school) => SchoolsDropdown[school]);
  //       console.log(moduleData[index].schools);
  //       moduleData[index].newSchools = {};
  //       // }
  //     }
  //   }

  //   // if (data) {
  //   //   console.log(data.modules[0].schools);
  //   // }
  // });

  /**
   * Sanitize the schools for the filter
   */

  // TODO: Here

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
      pathname: routing.module.create,
      query: {
        redirectUrl: routing.admin.modules,
      },
    });
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
      name: "schools",
      label: "Schools",
      options: {
        customBodyRender: (schools: Schools[]) => {
          return (
            <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
              {schools.map((school, index) => (
                <Chip key={index} label={SchoolAcronyms[school]} color="primary" size="small" />
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
        {selectedRows.data.length === 1 ? (
          <IconButtonWrapper
            testId="update-user-button-wrapper"
            tooltip={"Update"}
            onClick={() => console.log(displayData[selectedRows.data[0].index].data)}
            // onClick={() => updateUser(displayData[selectedRows.data[0].index].data)}
          >
            <EditIcon testId={"update-user-button-icon"} />
          </IconButtonWrapper>
        ) : null}
        <IconButtonWrapper
          testId="delete-user-button-wrapper"
          tooltip={"Delete"}
          onClick={() => console.log(selectedRows.data, displayData)}
          // onClick={() => selectDeleteUsers(selectedRows.data, displayData)}
        >
          <DeleteIcon testId={"delete-user-button-icon"} />
        </IconButtonWrapper>
      </Container>
    ),
  };

  // On delete
  // Check the status
  // Check the total students

  // Get
  // Get all modules that I owned
  // Get all modules I am a teaching module member

  return (
    <Base topLeftComponent="menu" loading={loading || isRedirecting} error={!!error}>
      <PageTitle title={"Modules"} testId="page-admin-modules-title" variant="h4" margin="2em" />
      <DataTable
        testId={"admin-modules-datatable"}
        isVisible={!!data}
        title={""}
        data={data ? data.modules : []}
        columns={tableColumns}
        options={tableOptions}
      />
    </Base>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN],
    },
  };
};

export default Modules;
