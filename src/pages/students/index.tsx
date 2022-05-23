import React, { useState } from "react";

import MUIDataTable, { MUIDataTableMeta, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";

import { Base, PageTitle, selectUserScoring } from "@/components";
import { RoleScope } from "@/utils";

interface UserScoring {
  id: string;
  name: string;
  attendsGroupMeetings: Number;
  contributesSignificantly: Number;
  completesAssinedTasks: Number;
  cooperativeAndSupportive: Number;
  listensAndContributes: Number;
  peerEvaluation: Number;
}

const Students: NextPage = () => {
  const me = {
    User: { userId: "me", name: "This is me" },
    PeerEvaluationReviewees: [
      {
        studentReviewed: {
          User: { userId: "#1", name: "User #1" },
        },
      },
      {
        studentReviewed: {
          User: { userId: "#2", name: "User #2" },
        },
      },
      {
        studentReviewed: {
          User: { userId: "#3", name: "User #3" },
        },
      },
      {
        studentReviewed: {
          User: { userId: "#4", name: "User #4" },
        },
      },
    ],
  };

  const initialiseData = () => {
    const row = ({ userId, name }) => ({
      id: userId,
      name: name,
      attendsGroupMeetings: 0,
      contributesSignificantly: 0,
      completesAssinedTasks: 0,
      cooperativeAndSupportive: 0,
      listensAndContributes: 0,
    });

    return [row(me.User), ...me.PeerEvaluationReviewees.map((user) => row(user.studentReviewed.User))];
  };

  const [userScoring, setUserScoring] = useState<UserScoring[]>(initialiseData());

  const updateScoring = (userId: String, field: String) => (event: PointerEvent) => {
    setUserScoring(
      userScoring.map((user: UserScoring) => {
        return user.id === userId ? { ...user, [field]: event.target.value } : user;
      })
    );
  };

  const calculateEvaluation = (_: String, { rowData }) => {
    return <strong>{rowData.slice(2, -1).reduce((prev: Any, cur: Any) => prev + cur, 0)}</strong>;
  };

  const scoring = (field: String) => (value: String | null, tableMeta: MUIDataTableMeta) => {
    const onChange = updateScoring(tableMeta["rowData"][0], field);
    return selectUserScoring({ value, onChange });
  };

  const userScoringColumns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
      },
    },
    {
      name: "name",
      label: "Student Name",
      options: {
        customBodyRender: (value: String | null) => value,
      },
    },
    {
      name: "attendsGroupMeetings",
      label: "Attends group meetings regularly and on time",
      options: {
        customBodyRender: scoring("attendsGroupMeetings"),
      },
    },
    {
      name: "contributesSignificantly",
      label: "Contributes significantly towards success of the project",
      options: {
        customBodyRender: scoring("contributesSignificantly"),
      },
    },
    {
      name: "completesAssinedTasks",
      label: "Completes assigned tasks on time and to good quality",
      options: {
        customBodyRender: scoring("completesAssinedTasks"),
      },
    },
    {
      name: "cooperativeAndSupportive",
      label: "Cooperative an supportive attitude towards team",
      options: {
        customBodyRender: scoring("cooperativeAndSupportive"),
      },
    },
    {
      name: "listensAndContributes",
      label: "Listens and contributes meaningfully in team discussions",
      options: {
        customBodyRender: scoring("listensAndContributes"),
      },
    },
    {
      name: "peerEvaluation",
      label: "Peer Evaluation",
      options: {
        customBodyRender: calculateEvaluation,
      },
    },
  ];

  const userScoringOptions: MUIDataTableOptions = {
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
    selectableRowsHeader: false,
    rowHover: true,
    download: false,
    print: false,
    pagination: false,
    filter: false,
    search: false,
    viewColumns: false,
  };

  return (
    <Base topLeftComponent="menu" loading={false}>
      <PageTitle title={"Students"} testId="page-update-peer-evaluation-title" variant="h4" margin="2em" />
      <MUIDataTable title={""} data={userScoring} columns={userScoringColumns} options={userScoringOptions} />
    </Base>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.AUTHENTICATED],
    },
  };
};

export default Students;
