interface IPeerEvaluationColumn {
  id: string;
  description: string;
  status: FieldStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface IModuleData {
  title: string;
  moduleCode: string;
  schools: Schools[];
  status: ModuleStatus;
  maxGradeIncrease: number;
  maxGradeDecrease: number;
  submissionsLockDate: Date | null | undefined;
  emailTitleReminder: string;
  emailBodyReminder: string;
  criteriaScoreRangeMin: number;
  criteriaScoreRangeMax: number;
  columns: IPeerEvaluationColumn[];
  moduleMembers: ModuleMember[];
}

interface IModuleDataTable extends IModuleData {
  id: string;
  moduleMembersCount: number;
  columnsCount: number;
  studentsCount: number;
  schoolsDataTable: Schools[];
}

interface ModuleMember {
  id: string;
  email: string;
  name: string;
  status: FieldStatus;
  permission: ModuleMemberPermissions;
}

enum ModuleMemberPermissions {
  OWNER = "OWNER",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

enum ModuleMemberPermissionsNoOwner {
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

enum Schools {
  SCHOOL_OF_ARTS_AND_CREATIVE_INDUSTRIES = "SCHOOL_OF_ARTS_AND_CREATIVE_INDUSTRIES",
  SCHOOL_OF_APPLIED_SCIENCES = "SCHOOL_OF_APPLIED_SCIENCES",
  SCHOOL_OF_THE_BUILT_ENVIRONMENT_AND_ARCHITECTURE = "SCHOOL_OF_THE_BUILT_ENVIRONMENT_AND_ARCHITECTURE",
  LSBU_BUSINESS_SCHOOL = "LSBU_BUSINESS_SCHOOL",
  SCHOOL_OF_ENGINEERING = "SCHOOL_OF_ENGINEERING",
  SCHOOL_OF_LAW_AND_SOCIAL_SCIENCES = "SCHOOL_OF_LAW_AND_SOCIAL_SCIENCES",
  INSTITUTE_OF_HEALTH_AND_SOCIAL_CARE = "INSTITUTE_OF_HEALTH_AND_SOCIAL_CARE",
}

enum ModuleStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  UNPUBLISHED = "UNPUBLISHED",
  SUBMISSIONS_LOCKED = "SUBMISSIONS_LOCKED",
}

enum FieldStatus {
  NEW = "NEW",
  UPDATED = "UPDATED",
  SAVED = "SAVED",
  DELETED = "DELETED",
}

const SchoolsDropdown = {
  SCHOOL_OF_ARTS_AND_CREATIVE_INDUSTRIES: "School of Arts and Creative Industries",
  SCHOOL_OF_APPLIED_SCIENCES: "School of Applied Sciences",
  SCHOOL_OF_THE_BUILT_ENVIRONMENT_AND_ARCHITECTURE: "School of The Built Environment and Architecture",
  LSBU_BUSINESS_SCHOOL: "LSBU Business School",
  SCHOOL_OF_ENGINEERING: "School of Engineering",
  SCHOOL_OF_LAW_AND_SOCIAL_SCIENCES: "School of Law and Social Sciences",
  INSTITUTE_OF_HEALTH_AND_SOCIAL_CARE: "Institute of Health and Social Care",
};

interface ISchoolsDataTable {
  [key: string]: string;
}

const SchoolsDataTable: ISchoolsDataTable = {
  "School of Arts and Creative Industries": "ACI",
  "School of Applied Sciences": "APS",
  "School of The Built Environment and Architecture": "BEA",
  "LSBU Business School": "BUS",
  "School of Engineering": "ENG",
  "School of Law and Social Sciences": "LSS",
  "Institute of Health and Social Care": "HSC",
};

const peerEvaluationColumnOrder = ["id", "description", "createdAt", "updatedAt", "status"];

const defaultPeerEvaluationColumns: IPeerEvaluationColumn[] = [
  {
    id: "column1",
    status: FieldStatus.NEW,
    description: "Attends group meetings regularly and on time",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "column2",
    status: FieldStatus.NEW,
    description: "Contributes significantly towards the success of the project",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "column3",
    status: FieldStatus.NEW,
    description: "Completes assigned tasks on time and to good quality",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "column4",
    status: FieldStatus.NEW,
    description: "Cooperative and supportive attitude towards team",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "column5",
    status: FieldStatus.NEW,
    description: "Listens and contributes meaningfully in team discussions",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const initialModuleState: IModuleData = {
  title: "",
  moduleCode: "",
  schools: [],
  status: ModuleStatus.DRAFT,
  maxGradeIncrease: 10,
  maxGradeDecrease: 100,
  submissionsLockDate: null,
  emailTitleReminder: "Peer Evaluation Reminder - {{moduleCode}}",
  emailBodyReminder: "Email body {{peerEvaluationUrl}}",
  criteriaScoreRangeMin: 1,
  criteriaScoreRangeMax: 5,
  columns: defaultPeerEvaluationColumns,
  moduleMembers: [
    {
      id: "",
      name: "",
      email: "",
      permission: ModuleMemberPermissions.OWNER,
      status: FieldStatus.NEW,
    },
  ],
};

const initialModuleMember: ModuleMember = {
  id: "",
  name: "",
  email: "",
  permission: ModuleMemberPermissions.VIEWER,
  status: FieldStatus.NEW,
};

const initialColumnState = {
  id: "",
  description: "",
};

const moduleMemberDataTableColumnOrder = ["name", "email", "permission", "status", "id"];

const moduleDataTableColumnOrder = [
  "id",
  "title",
  "createdAt",
  "updatedAt",
  "moduleCode",
  "status",
  "maxGradeIncrease",
  "maxGradeDecrease",
  "submissionsLockDate",
  "criteriaScoreRangeMin",
  "criteriaScoreRangeMax",
  "moduleMembersCount",
  "columnsCount",
  "studentsCount",
  "schools",
];

export {
  FieldStatus,
  initialColumnState,
  initialModuleMember,
  initialModuleState,
  moduleDataTableColumnOrder,
  moduleMemberDataTableColumnOrder,
  ModuleMemberPermissions,
  ModuleMemberPermissionsNoOwner,
  ModuleStatus,
  peerEvaluationColumnOrder,
  Schools,
  SchoolsDataTable,
  SchoolsDropdown,
};

export type { IModuleData, IModuleDataTable, IPeerEvaluationColumn, ModuleMember };
