import {
  EmailCreateNestedOneWithoutModuleInput,
  EmailUpdateOneWithoutModuleInput,
  Module,
  ModuleCreateInput,
  ModuleTeachingMemberCreateWithoutModuleInput,
  ModuleTeachingMember as ModuleTeachingMemberPrisma,
  ModuleTeachingMemberUpdateWithWhereUniqueWithoutModuleInput,
  ModuleTeachingMemberWhereUniqueInput,
  ModuleUpdateInput,
  PeerEvaluationColumn,
  PeerEvaluationColumnCreateWithoutModuleInput,
  PeerEvaluationColumnUpdateWithWhereUniqueWithoutModuleInput,
  PeerEvaluationColumnWhereUniqueInput,
} from "@generated/type-graphql";

import {
  FieldStatus,
  IModuleData,
  IPeerEvaluationColumn,
  ModuleStatus,
  ModuleTeachingMember,
  ModuleTeachingMemberRoles,
  Schools,
} from "@/types/module";

type ColumnCreateMany = PeerEvaluationColumnCreateWithoutModuleInput[];

type ColumnUpdateMany = PeerEvaluationColumnUpdateWithWhereUniqueWithoutModuleInput[];

type ColumnsDeleteMany = PeerEvaluationColumnWhereUniqueInput[];

type ModuleTeachingMemberCreateMany = ModuleTeachingMemberCreateWithoutModuleInput[];

type ModuleTeachingMemberUpdateMany = ModuleTeachingMemberUpdateWithWhereUniqueWithoutModuleInput[];

type ModuleTeachingMemberDeleteMany = ModuleTeachingMemberWhereUniqueInput[];

const sanitizeEmailReminderDataOnCreate = (title: string, body: string): EmailCreateNestedOneWithoutModuleInput => {
  return {
    create: {
      title: title,
      body: body,
    },
  };
};

const sanitizeEmailReminderDataOnUpdate = (title: string, body: string): EmailUpdateOneWithoutModuleInput => {
  return {
    update: {
      title: {
        set: title,
      },
      body: {
        set: body,
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
    };
  };

  return columnsFetch.map((column) => getSanitizeColumnsOnFetch(column));
};

const sanitizeColumnsDataOnCreate = (columns: IPeerEvaluationColumn[]): ColumnCreateMany => {
  const createManyColumns: ColumnCreateMany = [];

  const getCreateManyColumnsObject = (description: string): PeerEvaluationColumnCreateWithoutModuleInput => {
    return {
      description,
    };
  };

  columns.forEach((column) => {
    if (column.status === "NEW") {
      createManyColumns.push(getCreateManyColumnsObject(column.description));
    }
  });

  return createManyColumns;
};

const sanitizeColumnsDataOnUpdate = (columns: IPeerEvaluationColumn[]): ColumnUpdateMany => {
  const updateManyColumns: ColumnUpdateMany = [];

  const getUpdateManyColumnsObject = (
    id: string,
    description: string
  ): PeerEvaluationColumnUpdateWithWhereUniqueWithoutModuleInput => {
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

const sanitizeModuleTeachingMemberOnFetch = (
  moduleTeachingMembersFetched: ModuleTeachingMemberPrisma[]
): ModuleTeachingMember[] => {
  const getSanitizeModuleTeachingMemberOnFetch = (
    moduleTeachingMember: ModuleTeachingMemberPrisma
  ): ModuleTeachingMember => {
    return {
      id: moduleTeachingMember.id,
      name: moduleTeachingMember.user?.name || "",
      email: moduleTeachingMember.user?.email || "",
      status: FieldStatus.SAVED,
      role: moduleTeachingMember.role as ModuleTeachingMemberRoles,
    };
  };

  return moduleTeachingMembersFetched.map((moduleTeachingMember) =>
    getSanitizeModuleTeachingMemberOnFetch(moduleTeachingMember)
  );
};

const sanitizeModuleTeachingMemberOnCreate = (
  moduleTeachingMembers: ModuleTeachingMember[]
): ModuleTeachingMemberCreateMany => {
  const moduleTeachingMemberCreateMany: ModuleTeachingMemberCreateMany = [];

  const getCreateManyModuleTeachingMemberObject = (
    email: string,
    role: ModuleTeachingMemberRoles
  ): ModuleTeachingMemberCreateWithoutModuleInput => {
    return {
      user: {
        connect: {
          email,
        },
      },
      role,
    };
  };

  moduleTeachingMembers.forEach((moduleTeachingMember) => {
    if (moduleTeachingMember.status === "NEW") {
      moduleTeachingMemberCreateMany.push(
        getCreateManyModuleTeachingMemberObject(moduleTeachingMember.email, moduleTeachingMember.role)
      );
    }
  });

  return moduleTeachingMemberCreateMany;
};

const sanitizeModuleTeachingMemberOnUpdate = (
  moduleTeachingMembers: ModuleTeachingMember[]
): ModuleTeachingMemberUpdateMany => {
  const moduleTeachingMemberUpdateMany: ModuleTeachingMemberUpdateMany = [];

  const getUpdateManyModuleTeachingMemberObject = (
    id: string,
    role: ModuleTeachingMemberRoles
  ): ModuleTeachingMemberUpdateWithWhereUniqueWithoutModuleInput => {
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

  moduleTeachingMembers.forEach((moduleTeachingMember) => {
    if (moduleTeachingMember.status === "UPDATED") {
      moduleTeachingMemberUpdateMany.push(
        getUpdateManyModuleTeachingMemberObject(moduleTeachingMember.id, moduleTeachingMember.role)
      );
    }
  });

  return moduleTeachingMemberUpdateMany;
};

const sanitizeModuleTeachingMemberOnDelete = (
  moduleTeachingMembers: ModuleTeachingMember[]
): ModuleTeachingMemberDeleteMany => {
  const moduleTeachingMemberUpdateMany: ModuleTeachingMemberDeleteMany = [];

  const getDeleteManyModuleTeachingMemberObject = (id: string): ModuleTeachingMemberWhereUniqueInput => {
    return {
      id,
    };
  };

  moduleTeachingMembers.forEach((moduleTeachingMember) => {
    if (moduleTeachingMember.status === "DELETED") {
      moduleTeachingMemberUpdateMany.push(getDeleteManyModuleTeachingMemberObject(moduleTeachingMember.id));
    }
  });

  return moduleTeachingMemberUpdateMany;
};

const sanitizeModuleDataOnCreate = (data: IModuleData): ModuleCreateInput => {
  const {
    title,
    moduleCode,
    status,
    maxGradeIncrease,
    maxGradeDecrease,
    submissionsLockDate,
    criteriaScoreRangeMin,
    criteriaScoreRangeMax,
    schools,
    emailTitleReminder,
    emailBodyReminder,
    moduleTeachingMembers,
    columns,
  } = data;

  return {
    title: title,
    moduleCode: moduleCode,
    status: status,
    maxGradeIncrease: maxGradeIncrease,
    maxGradeDecrease: maxGradeDecrease,
    submissionsLockDate: submissionsLockDate ? new Date(submissionsLockDate) : undefined,
    criteriaScoreRangeMin: criteriaScoreRangeMin,
    criteriaScoreRangeMax: criteriaScoreRangeMax,
    schools: {
      set: schools,
    },
    reminderEmail: {
      ...sanitizeEmailReminderDataOnCreate(emailTitleReminder, emailBodyReminder),
    },
    moduleTeachingMembers: {
      create: sanitizeModuleTeachingMemberOnCreate(moduleTeachingMembers),
    },
    columns: {
      create: sanitizeColumnsDataOnCreate(columns),
    },
  };
};

const sanitizeModuleDataOnUpdate = (data: IModuleData): ModuleUpdateInput => {
  const {
    title,
    moduleCode,
    status,
    maxGradeIncrease,
    maxGradeDecrease,
    submissionsLockDate,
    criteriaScoreRangeMin,
    criteriaScoreRangeMax,
    schools,
    emailTitleReminder,
    emailBodyReminder,
    moduleTeachingMembers,
    columns,
  } = data;

  const getModuleTeachingMemberVariables = () => {
    const moduleTeachingMemberVariables: { [key: string]: object } = {
      create: {},
      update: {},
      delete: {},
    };

    const onCreate = sanitizeModuleTeachingMemberOnCreate(moduleTeachingMembers);

    const onUpdate = sanitizeModuleTeachingMemberOnUpdate(moduleTeachingMembers);

    const onDelete = sanitizeModuleTeachingMemberOnDelete(moduleTeachingMembers);

    if (onCreate.length) {
      moduleTeachingMemberVariables.create = onCreate;
    } else {
      delete moduleTeachingMemberVariables.create;
    }

    if (onUpdate.length) {
      moduleTeachingMemberVariables.update = onUpdate;
    } else {
      delete moduleTeachingMemberVariables.update;
    }

    if (onDelete.length) {
      moduleTeachingMemberVariables.delete = onDelete;
    } else {
      delete moduleTeachingMemberVariables.delete;
    }

    return moduleTeachingMemberVariables;
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

  const moduleTeachingMemberVariables = getModuleTeachingMemberVariables();

  const columnVariables = getColumnVariables();

  const updateData: { [key: string]: object } = {
    title: {
      set: title,
    },
    moduleCode: {
      set: moduleCode,
    },
    status: {
      set: status,
    },
    maxGradeIncrease: {
      set: maxGradeIncrease,
    },
    maxGradeDecrease: {
      set: maxGradeDecrease,
    },
    submissionsLockDate: {
      set: submissionsLockDate ? new Date(submissionsLockDate) : undefined,
    },
    criteriaScoreRangeMin: {
      set: criteriaScoreRangeMin,
    },
    criteriaScoreRangeMax: {
      set: criteriaScoreRangeMax,
    },
    schools: {
      set: schools,
    },
    reminderEmail: {
      ...sanitizeEmailReminderDataOnUpdate(emailTitleReminder, emailBodyReminder),
    },
    moduleTeachingMembers: {
      ...moduleTeachingMemberVariables,
    },
    columns: {
      ...columnVariables,
    },
  };

  if (!submissionsLockDate) {
    delete updateData.submissionsLockDate;
  }

  if (!Object.keys(moduleTeachingMemberVariables).length) {
    delete updateData.moduleTeachingMembers;
  }

  if (!Object.keys(columnVariables).length) {
    delete updateData.columns;
  }

  return updateData;
};

const sanitizeModuleDataOnFetch = (data: Module): IModuleData | undefined => {
  const {
    title,
    moduleCode,
    status,
    maxGradeIncrease,
    maxGradeDecrease,
    submissionsLockDate,
    criteriaScoreRangeMin,
    criteriaScoreRangeMax,
    schools,
    reminderEmail,
    moduleTeachingMembers,
    columns,
  } = data;

  if (moduleTeachingMembers && columns) {
    return {
      ...data,
      title: title,
      moduleCode: moduleCode,
      status: status as ModuleStatus,
      maxGradeIncrease: maxGradeIncrease,
      maxGradeDecrease: maxGradeDecrease,
      submissionsLockDate: submissionsLockDate,
      criteriaScoreRangeMin: criteriaScoreRangeMin,
      criteriaScoreRangeMax: criteriaScoreRangeMax,
      emailTitleReminder: reminderEmail?.title || "",
      emailBodyReminder: reminderEmail?.body || "",
      schools: schools as Schools[],
      moduleTeachingMembers: sanitizeModuleTeachingMemberOnFetch(moduleTeachingMembers),
      columns: sanitizeColumnsDataOnFetch(columns),
    };
  }

  return undefined;
};

export { sanitizeModuleDataOnCreate, sanitizeModuleDataOnFetch, sanitizeModuleDataOnUpdate };
