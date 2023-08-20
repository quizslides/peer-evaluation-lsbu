import {
  EmailCreateNestedOneWithoutPeerEvaluationInput,
  EmailUpdateOneWithoutPeerEvaluationNestedInput,
  PeerEvaluation,
  PeerEvaluationColumn,
  PeerEvaluationColumnCreateWithoutPeerEvaluationInput,
  PeerEvaluationColumnUpdateWithWhereUniqueWithoutPeerEvaluationInput,
  PeerEvaluationColumnWhereUniqueInput,
  PeerEvaluationCreateInput,
  PeerEvaluationTeachingMemberCreateWithoutPeerEvaluationInput,
  PeerEvaluationTeachingMember as PeerEvaluationTeachingMemberPrisma,
  PeerEvaluationTeachingMemberUpdateWithWhereUniqueWithoutPeerEvaluationInput,
  PeerEvaluationTeachingMemberWhereUniqueInput,
  PeerEvaluationUpdateInput,
} from "@generated/type-graphql";

import { PeerEvaluationDashboard } from "@/pages/api/resolvers/lecturer/peer-evaluation";
import {
  FieldStatus,
  IPeerEvaluationColumn,
  IPeerEvaluationData,
  PeerEvaluationColumnAction,
  PeerEvaluationStatus,
  PeerEvaluationTeachingMember,
  PeerEvaluationTeachingMemberRoles,
  Schools,
  SchoolsDataTable,
  SchoolsDropdown,
} from "@/types/peer-evaluation";
import { getDateLocaleString } from "@/utils/date";

type ColumnCreateMany = PeerEvaluationColumnCreateWithoutPeerEvaluationInput[];

type ColumnUpdateMany = PeerEvaluationColumnUpdateWithWhereUniqueWithoutPeerEvaluationInput[];

type ColumnsDeleteMany = PeerEvaluationColumnWhereUniqueInput[];

type PeerEvaluationTeachingMemberCreateMany = PeerEvaluationTeachingMemberCreateWithoutPeerEvaluationInput[];

type PeerEvaluationTeachingMemberUpdateMany =
  PeerEvaluationTeachingMemberUpdateWithWhereUniqueWithoutPeerEvaluationInput[];

type PeerEvaluationTeachingMemberDeleteMany = PeerEvaluationTeachingMemberWhereUniqueInput[];

const sanitizeSchoolsOnFetch = (data: PeerEvaluation): PeerEvaluation => {
  data.schools = data.schools.map((school) => SchoolsDropdown[school]) as Schools[];

  return data;
};

const sanitizeSchoolsOnFetchPeerEvaluationView = (data: PeerEvaluationDashboard): PeerEvaluationDashboard => {
  data.schools = data.schools.map((school) => SchoolsDataTable[SchoolsDropdown[school]]) as Schools[];

  return data;
};

const getSanitizedSubmissionLockDate = (date: Date | null): string => (date ? getDateLocaleString(date) : "Not set");

const sanitizeEmailReminderDataOnCreate = (
  subject: string,
  body: string
): EmailCreateNestedOneWithoutPeerEvaluationInput => {
  return {
    create: {
      subject: subject,
      body: body,
    },
  };
};

const sanitizeEmailReminderDataOnUpdate = (
  subject: string,
  body: string
): EmailUpdateOneWithoutPeerEvaluationNestedInput => {
  return {
    update: {
      data: {
        subject: {
          set: subject,
        },
        body: {
          set: body,
        },
      },
    },
  };
};

const sanitizeColumnsDataOnFetch = (columnsFetch: PeerEvaluationColumn[]): IPeerEvaluationColumn[] => {
  const getSanitizeColumnsOnFetch = ({
    id,
    description,
    createdAt,
    updatedAt,
  }: PeerEvaluationColumn): IPeerEvaluationColumn => {
    return {
      id,
      description,
      createdAt,
      updatedAt,
      status: FieldStatus.SAVED,
      action: PeerEvaluationColumnAction.NONE,
    };
  };

  return columnsFetch.map((column) => getSanitizeColumnsOnFetch(column));
};

const sanitizeColumnsDataOnCreate = (columns: IPeerEvaluationColumn[]): ColumnCreateMany => {
  const createManyColumns: ColumnCreateMany = [];

  const getCreateManyColumnsObject = (
    createdAt: Date,
    description: string,
    updatedAt: Date
  ): PeerEvaluationColumnCreateWithoutPeerEvaluationInput => {
    return {
      createdAt,
      description,
      updatedAt,
    };
  };

  columns.forEach((column, index) => {
    if (column.status === "NEW") {
      const date = new Date(new Date().setMilliseconds(new Date().getMilliseconds() + index));

      createManyColumns.push(getCreateManyColumnsObject(date, column.description, date));
    }
  });

  return createManyColumns;
};

const sanitizeColumnsDataOnUpdate = (columns: IPeerEvaluationColumn[]): ColumnUpdateMany => {
  const updateManyColumns: ColumnUpdateMany = [];

  const getUpdateManyColumnsObject = (
    id: string,
    description: string
  ): PeerEvaluationColumnUpdateWithWhereUniqueWithoutPeerEvaluationInput => {
    return {
      where: {
        id,
      },
      data: {
        description: {
          set: description,
        },
      },
    };
  };

  columns.forEach((column) => {
    if (column.status === "UPDATED") {
      updateManyColumns.push(getUpdateManyColumnsObject(column.id, column.description));
    }
  });

  return updateManyColumns;
};

const sanitizeColumnsDataOnDelete = (columns: IPeerEvaluationColumn[]): ColumnsDeleteMany => {
  const deleteManyColumns: ColumnsDeleteMany = [];

  const getDeleteManyColumnsObject = (id: string): PeerEvaluationColumnWhereUniqueInput => {
    return {
      id,
    };
  };

  columns.forEach((column) => {
    if (column.status === "DELETED") {
      deleteManyColumns.push(getDeleteManyColumnsObject(column.id));
    }
  });

  return deleteManyColumns;
};

const sanitizePeerEvaluationTeachingMemberOnFetch = (
  peerEvaluationTeachingMembersFetched: PeerEvaluationTeachingMemberPrisma[]
): PeerEvaluationTeachingMember[] => {
  const getSanitizePeerEvaluationTeachingMemberOnFetch = (
    peerEvaluationTeachingMember: PeerEvaluationTeachingMemberPrisma
  ): PeerEvaluationTeachingMember => {
    return {
      id: peerEvaluationTeachingMember.id,
      name: peerEvaluationTeachingMember.user?.name || "",
      email: peerEvaluationTeachingMember.user?.email || "",
      status: FieldStatus.SAVED,
      role: peerEvaluationTeachingMember.role as PeerEvaluationTeachingMemberRoles,
    };
  };

  return peerEvaluationTeachingMembersFetched.map((peerEvaluationTeachingMember) =>
    getSanitizePeerEvaluationTeachingMemberOnFetch(peerEvaluationTeachingMember)
  );
};

const sanitizePeerEvaluationTeachingMemberOnCreate = (
  peerEvaluationTeachingMembers: PeerEvaluationTeachingMember[]
): PeerEvaluationTeachingMemberCreateMany => {
  const peerEvaluationTeachingMemberCreateMany: PeerEvaluationTeachingMemberCreateMany = [];

  const getCreateManyPeerEvaluationTeachingMemberObject = (
    email: string,
    role: PeerEvaluationTeachingMemberRoles
  ): PeerEvaluationTeachingMemberCreateWithoutPeerEvaluationInput => {
    return {
      user: {
        connect: {
          email,
        },
      },
      role,
    };
  };

  peerEvaluationTeachingMembers.forEach((peerEvaluationTeachingMember) => {
    if (peerEvaluationTeachingMember.status === "NEW") {
      peerEvaluationTeachingMemberCreateMany.push(
        getCreateManyPeerEvaluationTeachingMemberObject(
          peerEvaluationTeachingMember.email,
          peerEvaluationTeachingMember.role
        )
      );
    }
  });

  return peerEvaluationTeachingMemberCreateMany;
};

const sanitizePeerEvaluationTeachingMemberOnUpdate = (
  peerEvaluationTeachingMembers: PeerEvaluationTeachingMember[]
): PeerEvaluationTeachingMemberUpdateMany => {
  const peerEvaluationTeachingMemberUpdateMany: PeerEvaluationTeachingMemberUpdateMany = [];

  const getUpdateManyPeerEvaluationTeachingMemberObject = (
    id: string,
    role: PeerEvaluationTeachingMemberRoles
  ): PeerEvaluationTeachingMemberUpdateWithWhereUniqueWithoutPeerEvaluationInput => {
    return {
      data: {
        role: {
          set: role,
        },
      },
      where: {
        id,
      },
    };
  };

  peerEvaluationTeachingMembers.forEach((peerEvaluationTeachingMember) => {
    if (peerEvaluationTeachingMember.status === "UPDATED") {
      peerEvaluationTeachingMemberUpdateMany.push(
        getUpdateManyPeerEvaluationTeachingMemberObject(
          peerEvaluationTeachingMember.id,
          peerEvaluationTeachingMember.role
        )
      );
    }
  });

  return peerEvaluationTeachingMemberUpdateMany;
};

const sanitizePeerEvaluationTeachingMemberOnDelete = (
  peerEvaluationTeachingMembers: PeerEvaluationTeachingMember[]
): PeerEvaluationTeachingMemberDeleteMany => {
  const peerEvaluationTeachingMemberUpdateMany: PeerEvaluationTeachingMemberDeleteMany = [];

  const getDeleteManyPeerEvaluationTeachingMemberObject = (
    id: string
  ): PeerEvaluationTeachingMemberWhereUniqueInput => {
    return {
      id,
    };
  };

  peerEvaluationTeachingMembers.forEach((peerEvaluationTeachingMember) => {
    if (peerEvaluationTeachingMember.status === "DELETED") {
      peerEvaluationTeachingMemberUpdateMany.push(
        getDeleteManyPeerEvaluationTeachingMemberObject(peerEvaluationTeachingMember.id)
      );
    }
  });

  return peerEvaluationTeachingMemberUpdateMany;
};

const sanitizePeerEvaluationDataOnCreate = (data: IPeerEvaluationData): PeerEvaluationCreateInput => {
  const {
    title,
    code,
    status,
    maxMarkIncrease,
    maxMarkDecrease,
    submissionsLockDate,
    criteriaScoreRangeMin,
    criteriaScoreRangeMax,
    schools,
    emailSubjectReminder,
    emailBodyReminder,
    peerEvaluationTeachingMembers,
    columns,
    instructions,
    scaleExplanation,
  } = data;

  return {
    title: title,
    code: code,
    status: status,
    maxMarkIncrease: Number(maxMarkIncrease),
    maxMarkDecrease: Number(maxMarkDecrease),
    submissionsLockDate: submissionsLockDate ? new Date(submissionsLockDate) : undefined,
    criteriaScoreRangeMin: Number(criteriaScoreRangeMin),
    criteriaScoreRangeMax: Number(criteriaScoreRangeMax),
    schools: {
      set: schools,
    },
    reminderEmail: {
      ...sanitizeEmailReminderDataOnCreate(emailSubjectReminder, emailBodyReminder),
    },
    peerEvaluationTeachingMembers: {
      create: sanitizePeerEvaluationTeachingMemberOnCreate(peerEvaluationTeachingMembers),
    },
    columns: {
      create: sanitizeColumnsDataOnCreate(columns),
    },
    instructions,
    scaleExplanation,
  };
};

const sanitizePeerEvaluationDataOnUpdate = (data: IPeerEvaluationData): PeerEvaluationUpdateInput => {
  const {
    title,
    code,
    status,
    maxMarkIncrease,
    maxMarkDecrease,
    submissionsLockDate,
    criteriaScoreRangeMin,
    criteriaScoreRangeMax,
    schools,
    emailSubjectReminder,
    emailBodyReminder,
    peerEvaluationTeachingMembers,
    columns,
    instructions,
    scaleExplanation,
  } = data;

  const getPeerEvaluationTeachingMemberVariables = () => {
    const peerEvaluationTeachingMemberVariables: { [key: string]: object } = {
      create: {},
      update: {},
      delete: {},
    };

    const onCreate = sanitizePeerEvaluationTeachingMemberOnCreate(peerEvaluationTeachingMembers);

    const onUpdate = sanitizePeerEvaluationTeachingMemberOnUpdate(peerEvaluationTeachingMembers);

    const onDelete = sanitizePeerEvaluationTeachingMemberOnDelete(peerEvaluationTeachingMembers);

    if (onCreate.length) {
      peerEvaluationTeachingMemberVariables.create = onCreate;
    } else {
      delete peerEvaluationTeachingMemberVariables.create;
    }

    if (onUpdate.length) {
      peerEvaluationTeachingMemberVariables.update = onUpdate;
    } else {
      delete peerEvaluationTeachingMemberVariables.update;
    }

    if (onDelete.length) {
      peerEvaluationTeachingMemberVariables.delete = onDelete;
    } else {
      delete peerEvaluationTeachingMemberVariables.delete;
    }

    return peerEvaluationTeachingMemberVariables;
  };

  const getColumnVariables = () => {
    const columnVariables: { [key: string]: object } = {
      create: {},
      update: {},
      delete: {},
    };

    const onCreate = sanitizeColumnsDataOnCreate(columns);

    const onUpdate = sanitizeColumnsDataOnUpdate(columns);

    const onDelete = sanitizeColumnsDataOnDelete(columns);

    if (onCreate.length) {
      columnVariables.create = onCreate;
    } else {
      delete columnVariables.create;
    }

    if (onUpdate.length) {
      columnVariables.update = onUpdate;
    } else {
      delete columnVariables.update;
    }

    if (onDelete.length) {
      columnVariables.delete = onDelete;
    } else {
      delete columnVariables.delete;
    }

    return columnVariables;
  };

  const peerEvaluationTeachingMemberVariables = getPeerEvaluationTeachingMemberVariables();

  const columnVariables = getColumnVariables();

  const updateData: { [key: string]: object } = {
    title: {
      set: title,
    },
    code: {
      set: code,
    },
    status: {
      set: status,
    },
    maxMarkIncrease: {
      set: Number(maxMarkIncrease),
    },
    maxMarkDecrease: {
      set: Number(maxMarkDecrease),
    },
    submissionsLockDate: {
      set: submissionsLockDate ? new Date(submissionsLockDate) : undefined,
    },
    criteriaScoreRangeMin: {
      set: Number(criteriaScoreRangeMin),
    },
    criteriaScoreRangeMax: {
      set: Number(criteriaScoreRangeMax),
    },
    schools: {
      set: schools,
    },
    reminderEmail: {
      ...sanitizeEmailReminderDataOnUpdate(emailSubjectReminder, emailBodyReminder),
    },
    peerEvaluationTeachingMembers: {
      ...peerEvaluationTeachingMemberVariables,
    },
    columns: {
      ...columnVariables,
    },
    instructions: {
      set: instructions,
    },
    scaleExplanation: {
      set: scaleExplanation,
    },
  };

  if (!submissionsLockDate) {
    delete updateData.submissionsLockDate;
  }

  if (!Object.keys(peerEvaluationTeachingMemberVariables).length) {
    delete updateData.peerEvaluationTeachingMembers;
  }

  if (!Object.keys(columnVariables).length) {
    delete updateData.columns;
  }

  return updateData;
};

const sanitizePeerEvaluationDataOnFetch = (data: PeerEvaluation): IPeerEvaluationData | undefined => {
  const {
    title,
    code,
    status,
    maxMarkIncrease,
    maxMarkDecrease,
    submissionsLockDate,
    criteriaScoreRangeMin,
    criteriaScoreRangeMax,
    schools,
    reminderEmail,
    peerEvaluationTeachingMembers,
    columns,
  } = data;

  if (peerEvaluationTeachingMembers && columns) {
    return {
      ...data,
      title: title,
      code: code,
      status: status as PeerEvaluationStatus,
      maxMarkIncrease: maxMarkIncrease,
      maxMarkDecrease: maxMarkDecrease,
      submissionsLockDate: submissionsLockDate,
      criteriaScoreRangeMin: criteriaScoreRangeMin,
      criteriaScoreRangeMax: criteriaScoreRangeMax,
      emailSubjectReminder: reminderEmail?.subject || "",
      emailBodyReminder: reminderEmail?.body || "",
      schools: schools as Schools[],
      peerEvaluationTeachingMembers: sanitizePeerEvaluationTeachingMemberOnFetch(peerEvaluationTeachingMembers),
      columns: sanitizeColumnsDataOnFetch(columns),
    };
  }

  return undefined;
};

const sanitizePeerEvaluationsDataOnFetch = (data: PeerEvaluation[]): IPeerEvaluationData[] => {
  for (let index in data) {
    data[index] = sanitizeSchoolsOnFetch(data[index]);
  }

  return data as unknown as IPeerEvaluationData[];
};

const sanitizePeerEvaluationViewDataOnFetch = (data: PeerEvaluationDashboard): PeerEvaluationDashboard => {
  data = sanitizeSchoolsOnFetchPeerEvaluationView(data);

  return data;
};

export {
  getSanitizedSubmissionLockDate,
  sanitizePeerEvaluationDataOnCreate,
  sanitizePeerEvaluationDataOnFetch,
  sanitizePeerEvaluationDataOnUpdate,
  sanitizePeerEvaluationsDataOnFetch,
  sanitizePeerEvaluationViewDataOnFetch,
};
