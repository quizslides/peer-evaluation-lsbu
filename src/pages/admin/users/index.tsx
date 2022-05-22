import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import styled from "@emotion/styled";
import { User } from "@generated/type-graphql";
import MUIDataTable, { DisplayData, MUIDataTableOptions } from "mui-datatables";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Action, Fab } from "react-tiny-fab";
import { ValidationError, object } from "yup";

import {
  Base,
  DataTable,
  DataTableRefreshActionButtonIcon,
  Dialog,
  IconButtonWrapper,
  PageTitle,
  Typography,
  UploadButton,
  VirtualStringList,
} from "@/components";
import { ObjectCSV } from "@/components/UploadButton/UploadButton";
import { CreateUserForm, DataTableEditDeleteToolbar, UpdateUserForm } from "@/containers";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon, GroupsIcon, PersonAddAltIcon, WidgetsIcon } from "@/icons";
import createMultipleUsers from "@/requests/direct/mutation/createMultipleUsers";
import updateManyUsers from "@/requests/direct/mutation/updateManyUsers";
import getGroupByUserByEmail from "@/requests/direct/query/getGroupByUserByEmail";
import useDeleteManyUser from "@/requests/hooks/mutations/useDeleteManyUser";
import useGetUsers from "@/requests/hooks/query/useGetUsers";
import { IUserData, initialUserState } from "@/types/user";
import {
  errorNotification,
  loadingNotification,
  successNotification,
  userEmailValidator,
  userNameValidator,
  userRoleValidator,
} from "@/utils";
import exampleFile from "@/utils/example-file";
import { RoleScope } from "@/utils/permissions";

const Container = styled.div`
  margin-right: 2em;
`;

interface UserDateBulk extends User {
  action: BulkUserAction;
}

enum BulkUserAction {
  UPDATE = "UPDATE",
  CREATE = "CREATE",
}

const UsersAdmin: NextPage = () => {
  const { data: session } = useSession();

  const apolloClient = useApolloClient();

  const { data, loading, error, refetch } = useGetUsers();

  const [deleteManyUser, { data: dataDeleteUsers, loading: loadingDeleteUsers, reset: resetUseDeleteManyUserHook }] =
    useDeleteManyUser("DeleteUsers");

  const [isCreateUserFormOpen, setCreateUserFormOpen] = useState(false);

  const [showBulkEditDialog, setShowBulkEditDialog] = useState(false);

  const [isUpdateUserFormOpen, setUpdateUserFormOpen] = useState(false);

  const [isDeletingUsers, setDeletingUsers] = useState(false);

  const [listDeleteUsers, setListDeleteUsers] = useState<string[]>([]);

  const [userValuesForm, setUserValuesForm] = useState<IUserData>(initialUserState);

  const [userDataBulk, setUserDataBulk] = useState<UserDateBulk[] | null>(null);

  const [userDataBulkError, setUserDataBulkError] = useState<{ [key: string]: string | number | null }[] | null>(null);

  const columnsUserDataBulk = [
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const tableOptionsUserDataBulk: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, csv without data",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
    selectableRowsHeader: false,
    rowHover: true,
    download: false,
    print: false,
    rowsPerPage: 100,
    filter: false,
    search: false,
    viewColumns: false,
  };

  const columnsUserDataBulkError = [
    {
      name: "row",
      label: "Row",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: Date | null) => {
          if (value) {
            return value;
          }

          return <CheckIcon testId={"bulk-data-name-valid"} />;
        },
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: Date | null) => {
          if (value) {
            return value;
          }

          return <CheckIcon testId={"bulk-data-email-valid"} />;
        },
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: Date | null) => {
          if (value) {
            return value;
          }

          return <CheckIcon testId={"bulk-data-role-valid"} />;
        },
      },
    },
  ];

  const tableOptionsUserDataBulkError: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Bulk data without error",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
    selectableRowsHeader: false,
    rowHover: true,
    download: false,
    print: false,
    rowsPerPage: 100,
    filter: false,
    search: false,
    viewColumns: false,
  };

  const userBulkSchema = object({
    ...userNameValidator,
    ...userEmailValidator,
    ...userRoleValidator,
  });

  const onUserBulkUpload = async (usersBulkList: ObjectCSV) => {
    loadingNotification("Processing csv...", "onUserBulkUpload");

    setShowBulkEditDialog(false);

    const usersBulk = usersBulkList as unknown as User[];

    // TODO: Refactored as well as emailVariables to ObjectKeys type to have better types

    const usersBulkErrors: { [key: string]: string | number | null }[] = [];

    const columnsBulk: { [key: string]: string | number | null } = {
      row: 0,
      name: "",
      email: "",
      role: "",
    };

    for (const userBulk of usersBulk) {
      try {
        await userBulkSchema.validate(userBulk, {
          abortEarly: false,
        });
      } catch (error: unknown) {
        const errorValidation = error as ValidationError;

        const userBulkIndexError = usersBulk.findIndex((userDataBulk) => userDataBulk === userBulk);

        const rawBulkError: { [key: string]: string | number | null } = {
          ...columnsBulk,
          row: userBulkIndexError + 2,
        };

        for (const errorBulk of errorValidation.inner) {
          if (errorBulk.path && errorBulk.message) {
            rawBulkError[errorBulk.path] = errorBulk.message;
          }
        }
        usersBulkErrors.push(rawBulkError);
      }
    }

    if (usersBulkErrors.length) {
      errorNotification("The CSV contains error, please review the errors below", "onUserBulkUpload");
      setUserDataBulkError(usersBulkErrors);
      return null;
    }

    const listEmails = usersBulk.map(({ email }) => email);

    const { data, errors } = await getGroupByUserByEmail(apolloClient, listEmails);

    if (errors) {
      errorNotification(errors[0].message, "onUserBulkUpload");
      return null;
    }

    const usersCreated = data.groupByUser.map(({ email }) => email);

    successNotification("Processed correctly", "onUserBulkUpload");

    setUserDataBulk(
      usersBulk.map((user) => ({
        action: usersCreated.includes(user.email) ? BulkUserAction.UPDATE : BulkUserAction.CREATE,
        ...user,
      }))
    );
  };

  const onBulkUserAction = async () => {
    loadingNotification("Running bulk...", "onBulkUserAction");

    const usersBulkUpdate = userDataBulk?.filter((user) => user.action === BulkUserAction.UPDATE);

    const usersBulkCreate = userDataBulk?.filter((user) => user.action === BulkUserAction.CREATE);

    const usersBulkUpdateSanitized = usersBulkUpdate?.map((item) => {
      return {
        email: item.email,
        name: item.name,
        role: item.role,
      };
    }) as IUserData[];

    const usersBulkCreateSanitized = usersBulkCreate?.map((item) => {
      return {
        email: item.email,
        name: item.name,
        role: item.role,
      };
    }) as IUserData[];

    const { errors: errorsUpdateManyUsers } = await updateManyUsers(apolloClient, usersBulkUpdateSanitized);

    const { errors: errorsCreateMultipleUsers } = await createMultipleUsers(apolloClient, usersBulkCreateSanitized);

    if (!errorsUpdateManyUsers && !errorsCreateMultipleUsers) {
      successNotification("Bulk actions finished successfully", "onBulkUserAction");
    } else {
      // TODO: Create a granular error notification to the user with all the errors
      errorNotification("Error running bulk", "onBulkUserAction");
    }

    setUserDataBulk(null);
  };

  const userDataTable = [
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
      label: "Account Verified",
      options: {
        customBodyRender: (value: Date | null) => {
          if (value) {
            return <CheckIcon testId={"user-verified-icon"} />;
          }

          return <CloseIcon testId={"user-not-verified-icon"} />;
        },
      },
    },
  ];

  const userDataTableColumnsOrder = ["name", "email", "role", "status"];

  const createNewUser = () => {
    setUserValuesForm(initialUserState);
    setCreateUserFormOpen(true);
  };

  const getUsersObject = (values: string[]) => {
    return userDataTableColumnsOrder.reduce((obj, column, index) => {
      return { ...obj, [column]: values[index] };
    }, {}) as IUserData;
  };

  const updateUser = (values: string[]) => {
    const userToUpdate = getUsersObject(values);

    setUserValuesForm(userToUpdate);
    setUpdateUserFormOpen(true);
  };

  const selectDeleteUsers = (selectedRows: Array<{ index: number; dataIndex: number }>, displayData: DisplayData) => {
    const rows = selectedRows.map(({ dataIndex }) => dataIndex);

    const usersObject = displayData.map(({ data }) => getUsersObject(data));

    let emailsToDelete = [];

    for (const row of rows) {
      emailsToDelete.push(usersObject[row].email);
    }

    if (session?.user.email && emailsToDelete.includes(session.user.email)) {
      errorNotification("You cannot delete your own account.");
      emailsToDelete = emailsToDelete.filter((item) => session.user.email !== item);
    }

    if (emailsToDelete.length) {
      setListDeleteUsers(emailsToDelete);
      setDeletingUsers(true);
    }
  };

  const onCancelDeleteUsers = () => {
    setListDeleteUsers([]);
    setDeletingUsers(false);
  };

  const onAcceptDeleteUsers = () => {
    setDeletingUsers(false);
    deleteManyUser({
      variables: {
        where: {
          email: {
            in: listDeleteUsers,
          },
        },
      },
    });
  };

  const onRefreshUsers = async () => {
    loadingNotification("Refreshing users", "AllUsers");
    try {
      await refetch();
      successNotification("Refreshed successfully", "AllUsers");
    } catch (error) {
      errorNotification("Something went wrong", "AllUsers");
    }
  };

  const userDataTableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no users in the system",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "multiple",
    selectableRowsHeader: true,
    rowHover: true,
    download: true,
    downloadOptions: {
      filename: `admin_users_${new Date().getTime()}.csv`,
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
    customToolbar: (_) => (
      <DataTableRefreshActionButtonIcon
        onClick={onRefreshUsers}
        testId={"refresh-admin-users-table"}
        toolTipLabel={"Refresh"}
      />
    ),
    customToolbarSelect: (selectedRows, displayData) => (
      <DataTableEditDeleteToolbar
        visibleEditButton={selectedRows.data.length === 1}
        editButton={{
          testId: "update-user-button-wrapper",
          toolTipLabel: "Update",
          onClick: () => updateUser(displayData[selectedRows.data[0].index].data),
        }}
        deleteButton={{
          testId: "delete-user-button-wrapper",
          toolTipLabel: "Delete",
          onClick: () => selectDeleteUsers(selectedRows.data, displayData),
        }}
      />
    ),
  };

  useEffect(() => {
    if (!userDataBulk) {
      refetch();
    }
  }, [userDataBulk, refetch]);

  useEffect(() => {
    if (!isUpdateUserFormOpen) {
      refetch();
    }
  }, [isUpdateUserFormOpen, refetch]);

  useEffect(() => {
    if (!isCreateUserFormOpen) {
      refetch();
    }
  }, [refetch, isCreateUserFormOpen]);

  useEffect(() => {
    if (!isDeletingUsers) {
      refetch();
    }
  }, [refetch, isDeletingUsers]);

  useEffect(() => {
    if (dataDeleteUsers && !loadingDeleteUsers) {
      refetch();
      resetUseDeleteManyUserHook();
      setListDeleteUsers([]);
    }
  }, [refetch, dataDeleteUsers, loadingDeleteUsers, resetUseDeleteManyUserHook]);

  return (
    <Base topLeftComponent="menu" loading={loading || !data} error={!!error}>
      <PageTitle title={"Users"} testId="page-admin-users-title" variant="h4" margin="2em" />

      {data && (
        <DataTable
          data={data.users}
          columns={userDataTable}
          options={userDataTableOptions}
          isVisible
          testId={"page-admin-users-datatable"}
        />
      )}

      <Fab icon={<WidgetsIcon testId={""} />}>
        <Action text="Add user" onClick={createNewUser}>
          <PersonAddAltIcon testId={""} />
        </Action>
        <Action text="Bulk add/edit users" onClick={() => setShowBulkEditDialog(true)}>
          <GroupsIcon testId={""} />
        </Action>
      </Fab>

      {isCreateUserFormOpen && (
        <CreateUserForm state={isCreateUserFormOpen} updateUserFormState={setCreateUserFormOpen} />
      )}

      {isUpdateUserFormOpen && (
        <UpdateUserForm
          email={userValuesForm.email}
          name={userValuesForm.name}
          role={userValuesForm.role}
          state={isUpdateUserFormOpen}
          updateUserFormState={setUpdateUserFormOpen}
        />
      )}

      <Dialog
        testId={"delete-user-dialog"}
        title={"Deleting users"}
        content={
          <>
            <Typography testId={"delete-user-dialog-text"}>
              Are you sure you want to delete the following users?
            </Typography>
            <br />
            <VirtualStringList
              testId={"delete-user-dialog-list"}
              data={listDeleteUsers}
              height={120}
              maxWidth={500}
              itemSize={25}
            />
          </>
        }
        rightButton="Yes"
        rightButtonVariant="contained"
        leftButton="Cancel"
        maxWidth="md"
        onClickRightButton={onAcceptDeleteUsers}
        onClickLeftButton={onCancelDeleteUsers}
        open={isDeletingUsers}
      />

      <Dialog
        testId={"bulk-add-edit-dialog"}
        title={"Bulk add/edit users"}
        content={
          <Typography testId={"bulk-add-edit-dialog-text"}>
            Download the example csv file, to add/update in bulk users.
          </Typography>
        }
        rightButton="Download Example"
        leftButton="Cancel"
        rightButtonVariant="outlined"
        maxWidth="md"
        onClickRightButton={() => (window.location.href = exampleFile.adminUploadMultipleUsers)}
        onClickLeftButton={() => setShowBulkEditDialog(false)}
        extraRightButton={<UploadButton onFilesSelected={onUserBulkUpload} />}
        open={showBulkEditDialog}
      />

      <Dialog
        testId={"user-bulk-dialog"}
        title={"Bulk add/update users"}
        content={
          userDataBulk && (
            <MUIDataTable
              title={""}
              data={userDataBulk}
              columns={columnsUserDataBulk}
              options={tableOptionsUserDataBulk}
            />
          )
        }
        rightButton="Continue"
        rightButtonVariant="contained"
        leftButton="Cancel"
        fullScreen
        onClickRightButton={onBulkUserAction}
        onClickLeftButton={() => {
          setUserDataBulk(null);
        }}
        open={userDataBulk !== null}
      />

      <Dialog
        testId={"user-bulk-error-dialog"}
        title={"Bulk Data Errors"}
        content={
          userDataBulkError && (
            <MUIDataTable
              title={""}
              data={userDataBulkError}
              columns={columnsUserDataBulkError}
              options={tableOptionsUserDataBulkError}
            />
          )
        }
        rightButton="Reupload CSV"
        rightButtonVariant="contained"
        leftButton="Cancel"
        fullScreen
        onClickLeftButton={() => {
          setUserDataBulkError(null);
          setShowBulkEditDialog(false);
        }}
        onClickRightButton={() => {
          setUserDataBulkError(null);
          setShowBulkEditDialog(true);
        }}
        open={userDataBulkError !== null}
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

export default UsersAdmin;
