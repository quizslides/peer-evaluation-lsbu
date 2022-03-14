import React from "react";

import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";

import { Base, DataTable, DataTableRefreshToolbarIcon, IconButtonWrapper, PageTitle } from "@/components";
import { DeleteIcon, EditIcon } from "@/icons";
import useGetModules from "@/requests/hooks/query/useGetModules";
import { SchoolAcronyms, Schools } from "@/types/module";
import { RoleScope, errorNotification, loadingNotification, successNotification } from "@/utils";

const Container = styled.div`
  margin-right: 2em;
`;

const Modules: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, error, refetch: runRefreshModules } = useGetModules();

  // useEffect(() => {
  //   console.log(data);
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

  const tableColumns: MUIDataTableColumnDef[] = [
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
    selectableRows: "multiple",
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
      <DataTableRefreshToolbarIcon onClick={onRefreshModules} testId={"refresh-admin-module-table"} />
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

  return (
    <Base topLeftComponent="menu" loading={false}>
      <PageTitle title={"Modules"} testId="page-admin-modules-title" variant="h4" margin="2em" />
      <DataTable
        testId={"admin-modules-datatable"}
        isVisible={!loading}
        title={"Modules"}
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
