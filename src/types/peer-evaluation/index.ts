enum PeerEvaluationColumnAction {
  CLEAR_RESULTS = "CLEAR_RESULTS",
  NONE = "NONE",
}

interface IPeerEvaluationColumn {
  id: string;
  description: string;
  status: FieldStatus;
  createdAt: Date;
  updatedAt: Date;
  action: PeerEvaluationColumnAction;
}

interface IPeerEvaluationData {
  id: string;
  title: string;
  code: string;
  schools: Schools[];
  status: PeerEvaluationStatus;
  maxMarkIncrease: number;
  maxMarkDecrease: number;
  submissionsLockDate: Date | null | string | undefined;
  emailSubjectReminder: string;
  emailBodyReminder: string;
  criteriaScoreRangeMin: number;
  criteriaScoreRangeMax: number;
  columns: IPeerEvaluationColumn[];
  peerEvaluationTeachingMembers: PeerEvaluationTeachingMember[];
  instructions: string;
  scaleExplanation: string;
}

interface PeerEvaluationTeachingMember {
  id: string;
  email: string;
  name: string;
  status: FieldStatus;
  role: PeerEvaluationTeachingMemberRoles;
}

enum PeerEvaluationTeachingMemberRoles {
  OWNER = "OWNER",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

enum PeerEvaluationTeachingMemberRolesNoOwner {
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

enum Schools {
  // New schools
  SCHOOL_OF_ALLIED_HEALTH_AND_LIFE_SCIENCES = "SCHOOL_OF_ALLIED_HEALTH_AND_LIFE_SCIENCES",
  SCHOOL_OF_NURSING_AND_MIDWIFERY = "SCHOOL_OF_NURSING_AND_MIDWIFERY",
  SCHOOL_OF_LAW_AND_EDUCATION = "SCHOOL_OF_LAW_AND_EDUCATION",
  SCHOOL_OF_ARTS_AND_SOCIAL_SCIENCES = "SCHOOL_OF_ARTS_AND_SOCIAL_SCIENCES",
  LSBU_BUSINESS_SCHOOL = "LSBU_BUSINESS_SCHOOL",
  SCHOOL_OF_ENGINEERING_AND_DESIGN = "SCHOOL_OF_ENGINEERING_AND_DESIGN",
  SCHOOL_OF_COMPUTER_SCIENCE_AND_DIGITAL_TECHNOLOGIES = "SCHOOL_OF_COMPUTER_SCIENCE_AND_DIGITAL_TECHNOLOGIES",
  SCHOOL_OF_ARCHITECTURE_AND_PLANNING = "SCHOOL_OF_ARCHITECTURE_AND_PLANNING",
  SCHOOL_OF_CONSTRUCTION_PROPERTY_AND_SURVEYING = "SCHOOL_OF_CONSTRUCTION_PROPERTY_AND_SURVEYING",
  
  // Deprecated schools (kept for backward compatibility)
  SCHOOL_OF_ARTS_AND_CREATIVE_INDUSTRIES = "SCHOOL_OF_ARTS_AND_CREATIVE_INDUSTRIES",
  SCHOOL_OF_APPLIED_SCIENCES = "SCHOOL_OF_APPLIED_SCIENCES",
  SCHOOL_OF_THE_BUILT_ENVIRONMENT_AND_ARCHITECTURE = "SCHOOL_OF_THE_BUILT_ENVIRONMENT_AND_ARCHITECTURE",
  SCHOOL_OF_ENGINEERING = "SCHOOL_OF_ENGINEERING",
  SCHOOL_OF_LAW_AND_SOCIAL_SCIENCES = "SCHOOL_OF_LAW_AND_SOCIAL_SCIENCES",
  INSTITUTE_OF_HEALTH_AND_SOCIAL_CARE = "INSTITUTE_OF_HEALTH_AND_SOCIAL_CARE",
}

enum PeerEvaluationStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  SUBMISSIONS_LOCKED = "SUBMISSIONS_LOCKED",
}

enum PeerEvaluationStatusDefinition {
  DRAFT = "Not visible to students",
  PUBLISHED = "Visible to students and accepting submissions",
  SUBMISSIONS_LOCKED = "Visible to students but not accepting submissions",
}

enum FieldStatus {
  NEW = "NEW",
  UPDATED = "UPDATED",
  SAVED = "SAVED",
  DELETED = "DELETED",
}

// Migration mapping from old to new schools
const SchoolsMigrationMap: { [key: string]: Schools } = {
  SCHOOL_OF_APPLIED_SCIENCES: Schools.SCHOOL_OF_ALLIED_HEALTH_AND_LIFE_SCIENCES,
  INSTITUTE_OF_HEALTH_AND_SOCIAL_CARE: Schools.SCHOOL_OF_NURSING_AND_MIDWIFERY,
  SCHOOL_OF_LAW_AND_SOCIAL_SCIENCES: Schools.SCHOOL_OF_LAW_AND_EDUCATION,
  SCHOOL_OF_ARTS_AND_CREATIVE_INDUSTRIES: Schools.SCHOOL_OF_ARTS_AND_SOCIAL_SCIENCES,
  LSBU_BUSINESS_SCHOOL: Schools.LSBU_BUSINESS_SCHOOL,
  SCHOOL_OF_ENGINEERING: Schools.SCHOOL_OF_ENGINEERING_AND_DESIGN,
  SCHOOL_OF_THE_BUILT_ENVIRONMENT_AND_ARCHITECTURE: Schools.SCHOOL_OF_ARCHITECTURE_AND_PLANNING,
};

const SchoolsDropdown = {
  SCHOOL_OF_ALLIED_HEALTH_AND_LIFE_SCIENCES: "School of Allied Health and Life Sciences",
  SCHOOL_OF_NURSING_AND_MIDWIFERY: "School of Nursing and Midwifery",
  SCHOOL_OF_LAW_AND_EDUCATION: "School of Law and Education",
  SCHOOL_OF_ARTS_AND_SOCIAL_SCIENCES: "School of Arts and Social Sciences",
  LSBU_BUSINESS_SCHOOL: "LSBU Business School",
  SCHOOL_OF_ENGINEERING_AND_DESIGN: "School of Engineering and Design",
  SCHOOL_OF_COMPUTER_SCIENCE_AND_DIGITAL_TECHNOLOGIES: "School of Computer Science and Digital Technologies",
  SCHOOL_OF_ARCHITECTURE_AND_PLANNING: "School of Architecture and Planning",
  SCHOOL_OF_CONSTRUCTION_PROPERTY_AND_SURVEYING: "School of Construction, Property and Surveying",
};

interface ISchoolsDataTable {
  [key: string]: string;
}

interface IStudentsTeamData {
  studentName: string;
  studentEmail: string;
  teamName: string | null;
}

const SchoolsDataTable: ISchoolsDataTable = {
  "School of Allied Health and Life Sciences": "AHLS",
  "School of Nursing and Midwifery": "N&M",
  "School of Law and Education": "L&A",
  "School of Arts and Social Sciences": "A&S",
  "LSBU Business School": "BUS",
  "School of Engineering and Design": "E&D",
  "School of Computer Science and Digital Technologies": "CSDT",
  "School of Architecture and Planning": "A&P",
  "School of Construction, Property and Surveying": "CPS",
};

const peerEvaluationColumnOrder = ["id", "description", "createdAt", "updatedAt", "status"];

const defaultPeerEvaluationColumns = (): IPeerEvaluationColumn[] => [
  {
    id: "column1",
    status: FieldStatus.NEW,
    description: "Attends group meetings regularly and on time",
    createdAt: new Date(new Date().setMilliseconds(new Date().getMilliseconds() + 1)),
    updatedAt: new Date(new Date().setMilliseconds(new Date().getMilliseconds() + 1)),
    action: PeerEvaluationColumnAction.NONE,
  },
  {
    id: "column2",
    status: FieldStatus.NEW,
    description: "Contributes significantly towards the success of the project",
    createdAt: new Date(new Date().setMilliseconds(new Date().getMilliseconds() + 2)),
    updatedAt: new Date(new Date().setMilliseconds(new Date().getMilliseconds() + 2)),
    action: PeerEvaluationColumnAction.NONE,
  },
  {
    id: "column3",
    status: FieldStatus.NEW,
    description: "Completes assigned tasks on time and to good quality",
    createdAt: new Date(new Date().setMilliseconds(new Date().getMilliseconds() + 3)),
    updatedAt: new Date(new Date().setMilliseconds(new Date().getMilliseconds() + 3)),
    action: PeerEvaluationColumnAction.NONE,
  },
  {
    id: "column4",
    status: FieldStatus.NEW,
    description: "Cooperative and supportive attitude towards team",
    createdAt: new Date(new Date().setMilliseconds(new Date().getMilliseconds() + 4)),
    updatedAt: new Date(new Date().setMilliseconds(new Date().getMilliseconds() + 4)),
    action: PeerEvaluationColumnAction.NONE,
  },
  {
    id: "column5",
    status: FieldStatus.NEW,
    description: "Listens and contributes meaningfully in team discussions",
    createdAt: new Date(new Date().setMilliseconds(new Date().getMilliseconds() + 5)),
    updatedAt: new Date(new Date().setMilliseconds(new Date().getMilliseconds() + 5)),
    action: PeerEvaluationColumnAction.NONE,
  },
];

const initialPeerEvaluationState = (): IPeerEvaluationData => {
  return {
    id: "",
    title: "",
    code: "",
    schools: [],
    status: PeerEvaluationStatus.DRAFT,
    maxMarkIncrease: 10,
    maxMarkDecrease: 100,
    submissionsLockDate: null,
    emailSubjectReminder: "Peer Evaluation Reminder - {{code}}",
    emailBodyReminder: "Email body {{peerEvaluationUrl}}",
    criteriaScoreRangeMin: 1,
    criteriaScoreRangeMax: 5,
    columns: defaultPeerEvaluationColumns(),
    peerEvaluationTeachingMembers: [
      {
        id: "",
        name: "",
        email: "",
        role: PeerEvaluationTeachingMemberRoles.OWNER,
        status: FieldStatus.NEW,
      },
    ],
    instructions:
      "<ol><li>Select a mark for each criteria and each student (including yourself)</li><li>Justify your marks by including a comment for each student (including yourself)</li><li>Save the form and close the browser tab</li></ol>",
    scaleExplanation:
      "<p>Use this scale to rate each criteria:</p><ul><li>5 –&gt; Outstanding</li><li>4 –&gt; Very Good</li><li>3 –&gt; Good</li><li>2 –&gt; Weak</li><li>1 –&gt; Poor / No contribution</li></ul>",
  };
};

const initialPeerEvaluationTeachingMember: PeerEvaluationTeachingMember = {
  id: "",
  name: "",
  email: "",
  role: PeerEvaluationTeachingMemberRoles.VIEWER,
  status: FieldStatus.NEW,
};

const initialColumnState = {
  id: "",
  description: "",
};

const peerEvaluationTeachingMemberDataTableColumnOrder = ["name", "email", "role", "status", "id"];

const peerEvaluationDataTableColumnOrder = [
  "actions",
  "id",
  "title",
  "createdAt",
  "updatedAt",
  "code",
  "status",
  "maxMarkIncrease",
  "maxMarkDecrease",
  "submissionsLockDate",
  "criteriaScoreRangeMin",
  "criteriaScoreRangeMax",
  "peerEvaluationTeachingMembersCount",
  "columnsCount",
  "peerEvaluationStudents",
  "schools",
];

export {
  FieldStatus,
  initialColumnState,
  initialPeerEvaluationState,
  initialPeerEvaluationTeachingMember,
  PeerEvaluationColumnAction,
  peerEvaluationColumnOrder,
  peerEvaluationDataTableColumnOrder,
  PeerEvaluationStatus,
  PeerEvaluationStatusDefinition,
  peerEvaluationTeachingMemberDataTableColumnOrder,
  PeerEvaluationTeachingMemberRoles,
  PeerEvaluationTeachingMemberRolesNoOwner,
  Schools,
  SchoolsDataTable,
  SchoolsDropdown,
  SchoolsMigrationMap,
};

export type { IPeerEvaluationColumn, IPeerEvaluationData, IStudentsTeamData, PeerEvaluationTeachingMember };
