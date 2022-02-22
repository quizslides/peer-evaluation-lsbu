import React, { useState } from "react";

import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import type { NextPage } from "next";

import { Base, Button, UploadButton } from "@/components";
import useGetUsers from "@/hooks/useGetUsers";
import { ROLE } from "@/utils/permissions";

const AllUsers: NextPage = () => {
  const { data, isLoading, isError } = useGetUsers();

  const [files, setFiles] = useState<string[][]>();

  const onFilesSelected = (csv: string[][]) => {
    setFiles(csv);
  };

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "emailVerified",
      label: "Account verified",
      options: {
        customBodyRender: (value: Date | null) => {
          if (value) return "Yes";

          return "No";
        },
      },
    },
  ];

  const options: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no users in the system",
      },
    },
    responsive: "vertical",
    tableBodyMaxHeight: "100%",
    selectableRows: "multiple",
    rowHover: true,
    download: true,
    downloadOptions: {
      filename: `admin_users-${new Date().getTime()}.csv`,
    },
    print: false,
    viewColumns: true,
    resizableColumns: false,
    rowsPerPage: 100,
    onTableChange: (action, tableState) => {
      if (action === "propsUpdate") {
        tableState.selectedRows.data = [];
        tableState.selectedRows.lookup = [];
      }
    },
    customToolbar: () => {
      return (
        <>
          <UploadButton multiple={false} onFilesSelected={onFilesSelected} />

          <Button
            variant="contained"
            testId={"admin-user-download-sample-file"}
            href="/example/admin_upload_multiple_users.csv"
          >
            example csv
          </Button>
        </>
      );
    },
    customToolbarSelect: () => <></>,
  };

  return (
    <Base topLeftComponent="menu" loading={isLoading || !data} error={isError}>
      {data && <MUIDataTable title={"Users"} data={data} columns={columns} options={options} />}
    </Base>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [ROLE.ADMIN],
    },
  };
};

export default AllUsers;
