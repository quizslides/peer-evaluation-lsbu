import {
  EmailCreateNestedOneWithoutModuleInput,
  EmailUpdateOneWithoutModuleInput,
  Module,
  ModuleCreateInput,
  ModuleMemberCreateWithoutModuleInput,
  ModuleMember as ModuleMemberPrisma,
  ModuleMemberUpdateWithWhereUniqueWithoutModuleInput,
  ModuleMemberWhereUniqueInput,
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
  ModuleMember,
  ModuleMemberPermissions,
  ModuleStatus,
  Schools,
} from "@/types/module";

type ColumnCreateMany = PeerEvaluationColumnCreateWithoutModuleInput[];

type ColumnUpdateMany = PeerEvaluationColumnUpdateWithWhereUniqueWithoutModuleInput[];

type ColumnsDeleteMany = PeerEvaluationColumnWhereUniqueInput[];

type TeachingModuleMemberCreateMany = ModuleMemberCreateWithoutModuleInput[];

type TeachingModuleMemberUpdateMany = ModuleMemberUpdateWithWhereUniqueWithoutModuleInput[];

type TeachingModuleMemberDeleteMany = ModuleMemberWhereUniqueInput[];

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
        set: body,
      },
      body: {
        set: title,
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

const sanitizeModuleTeachingMemberOnFetch = (moduleTeachingMembersFetched: ModuleMemberPrisma[]): ModuleMember[] => {
  const getSanitizeModuleTeachingMemberOnFetch = (moduleTeachingMember: ModuleMemberPrisma): ModuleMember => {
    return {
      id: moduleTeachingMember.id,
      name: moduleTeachingMember.user?.name || "",
      email: moduleTeachingMember.user?.email || "",
      status: FieldStatus.SAVED,
      permission: moduleTeachingMember.permission as ModuleMemberPermissions,
    };
  };

  return moduleTeachingMembersFetched.map((moduleTeachingMember) =>
    getSanitizeModuleTeachingMemberOnFetch(moduleTeachingMember)
  );
};

const sanitizeModuleTeachingMemberOnCreate = (
  moduleTeachingMembers: ModuleMember[]
): TeachingModuleMemberCreateMany => {
  const moduleTeachingMemberCreateMany: TeachingModuleMemberCreateMany = [];

  const getCreateManyModuleTeachingMemberObject = (
    email: string,
    permission: ModuleMemberPermissions
  ): ModuleMemberCreateWithoutModuleInput => {
    return {
      user: {
        connect: {
          email,
        },
      },
      permission,
    };
  };

  moduleTeachingMembers.forEach((moduleTeachingMember) => {
    if (moduleTeachingMember.status === "NEW") {
      moduleTeachingMemberCreateMany.push(
        getCreateManyModuleTeachingMemberObject(moduleTeachingMember.email, moduleTeachingMember.permission)
      );
    }
  });

  return moduleTeachingMemberCreateMany;
};

const sanitizeModuleTeachingMemberOnUpdate = (
  moduleTeachingMembers: ModuleMember[]
): TeachingModuleMemberUpdateMany => {
  const moduleTeachingMemberUpdateMany: TeachingModuleMemberUpdateMany = [];

  const getUpdateManyModuleTeachingMemberObject = (
    id: string,
    permission: ModuleMemberPermissions
  ): ModuleMemberUpdateWithWhereUniqueWithoutModuleInput => {
    return {
      data: {
        permission: {
          set: permission,
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
        getUpdateManyModuleTeachingMemberObject(moduleTeachingMember.id, moduleTeachingMember.permission)
      );
    }
  });

  return moduleTeachingMemberUpdateMany;
};

const sanitizeModuleTeachingMemberOnDelete = (
  moduleTeachingMembers: ModuleMember[]
): TeachingModuleMemberDeleteMany => {
  const moduleTeachingMemberUpdateMany: TeachingModuleMemberDeleteMany = [];

  const getDeleteManyModuleTeachingMemberObject = (id: string): ModuleMemberWhereUniqueInput => {
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
    moduleMembers,
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
    moduleMembers: {
      create: sanitizeModuleTeachingMemberOnCreate(moduleMembers),
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
    moduleMembers,
    columns,
  } = data;

  return {
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
    moduleMembers: {
      create: {
        ...sanitizeModuleTeachingMemberOnCreate(moduleMembers),
      },
      update: {
        ...sanitizeModuleTeachingMemberOnUpdate(moduleMembers),
      },
      delete: {
        ...sanitizeModuleTeachingMemberOnDelete(moduleMembers),
      },
    },
    columns: {
      create: sanitizeColumnsDataOnCreate(columns),
      update: sanitizeColumnsDataOnUpdate(columns),
      delete: sanitizeColumnsDataOnDelete(columns),
    },
  };
};

// TODO
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
    moduleMembers,
    columns,
  } = data;

  if (moduleMembers && columns) {
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
      moduleMembers: sanitizeModuleTeachingMemberOnFetch(moduleMembers),
      columns: sanitizeColumnsDataOnFetch(columns),
    };
  }

  return undefined;
};

export { sanitizeModuleDataOnCreate, sanitizeModuleDataOnFetch, sanitizeModuleDataOnUpdate };
