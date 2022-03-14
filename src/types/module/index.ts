enum ModuleMemberPermissions {
  OWNER = "OWNER",
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

enum ModuleStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  UNPUBLISHED = "UNPUBLISHED",
  SUBMISSIONS_LOCKED = "SUBMISSIONS_LOCKED",
}

const initialModuleState = {
  title: "",
  moduleCode: "",
  schools: [],
  status: ModuleStatus.DRAFT,
  maxGradeIncrease: 10,
  maxGradeDecrease: 100,
  submissionsLockDate: null,
  reminderEmailTitle: "Peer Evaluation Reminder - {{moduleCode}}",
  reminderEmailBody: "Email body {{url}}",
  criteriaScoreRangeMin: 1,
  criteriaScoreRangeMax: 5,
};

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
}

export { initialModuleState, ModuleMemberPermissions, ModuleStatus, SchoolAcronyms, Schools, SchoolsDropdown };

export type { IModuleData };
