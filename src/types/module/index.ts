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
  submissionsLockDate: null | Date;
  reminderEmailTitle: string;
  reminderEmailBody: string | null;
  criteriaScoreRangeMin: number;
  criteriaScoreRangeMax: number;
  columns: IPeerEvaluationColumn[];
  moduleMembers: ModuleMember[];
}

interface ModuleMember {
  permission: ModuleMemberPermissions;
  email: string;
  name: string;
  status: FieldStatus;
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

const SchoolAcronyms = {
  SCHOOL_OF_ARTS_AND_CREATIVE_INDUSTRIES: "ACI",
  SCHOOL_OF_APPLIED_SCIENCES: "APS",
  SCHOOL_OF_THE_BUILT_ENVIRONMENT_AND_ARCHITECTURE: "BEA",
  LSBU_BUSINESS_SCHOOL: "BUS",
  SCHOOL_OF_ENGINEERING: "ENG",
  SCHOOL_OF_LAW_AND_SOCIAL_SCIENCES: "LSS",
  INSTITUTE_OF_HEALTH_AND_SOCIAL_CARE: "HSC",
};

const SchoolsDropdown = {
  ACI: "School of Arts and Creative Industries",
  APS: "School of Applied Sciences",
  BEA: "School of The Built Environment and Architecture",
  BUS: "LSBU Business School",
  ENG: "School of Engineering",
  LSS: "School of Law and Social Sciences",
  HSC: "Institute of Health and Social Care",
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
  reminderEmailTitle: "Peer Evaluation Reminder - {{moduleCode}}",
  reminderEmailBody: "Email body {{peerEvaluationUrl}}",
  criteriaScoreRangeMin: 1,
  criteriaScoreRangeMax: 5,
  columns: defaultPeerEvaluationColumns,
  moduleMembers: [
    {
      name: "",
      email: "",
      permission: ModuleMemberPermissions.OWNER,
      status: FieldStatus.NEW,
    },
  ],
};

const initialModuleMember: ModuleMember = {
  name: "",
  email: "",
  permission: ModuleMemberPermissions.VIEWER,
  status: FieldStatus.NEW,
};

const initialColumnState = {
  description: "",
};

const moduleMemberColumnOrder = ["name", "email", "permission"];

export {
  FieldStatus,
  initialColumnState,
  initialModuleMember,
  initialModuleState,
  moduleMemberColumnOrder,
  ModuleMemberPermissions,
  ModuleMemberPermissionsNoOwner,
  ModuleStatus,
  peerEvaluationColumnOrder,
  SchoolAcronyms,
  Schools,
  SchoolsDropdown,
};

export type { IModuleData, IPeerEvaluationColumn, ModuleMember };
