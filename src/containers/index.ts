import dynamic from "next/dynamic";

import CreateColumnForm from "@/containers/CreateColumnForm";
import CreatePeerEvaluationTeachingMemberForm from "@/containers/CreatePeerEvaluationTeachingMemberForm";
import CreateUserForm from "@/containers/CreateUserForm";
import DataTableEditDeleteToolbar from "@/containers/DataTableEditDeleteToolbar";
import Error404 from "@/containers/Error404";
import Error500 from "@/containers/Error500";
import ErrorAuth from "@/containers/ErrorAuth";
import ErrorContainer from "@/containers/ErrorContainer";
import HomePageContainer from "@/containers/HomePageContainer";
import Layout from "@/containers/Layout";
import LoadingContainer from "@/containers/LoadingContainer";
import Navigation from "@/containers/Navigation";
import PeerEvaluationCard from "@/containers/PeerEvaluationCard";
import PeerEvaluationColumnManagement from "@/containers/PeerEvaluationColumnManagement";
import PeerEvaluationsDataTable from "@/containers/PeerEvaluationsDataTable";
import PeerEvaluationStatusContainer from "@/containers/PeerEvaluationStatusContainer";
import PeerEvaluationStudentsDataTable from "@/containers/PeerEvaluationStudentsDataTable";
import PeerEvaluationStudentTable from "@/containers/PeerEvaluationStudentTable";
import PeerEvaluationStudentTeamActionsDialog from "@/containers/PeerEvaluationStudentTeamActionsDialog";
import SignInWrapper from "@/containers/SignInWrapper";
import UnauthorizedContainer from "@/containers/UnauthorizedContainer";
import UpdatePeerEvaluationColumnForm from "@/containers/UpdatePeerEvaluationColumnForm";
import UpdatePeerEvaluationForm from "@/containers/UpdatePeerEvaluationForm";
import UpdatePeerEvaluationTeachingMemberForm from "@/containers/UpdatePeerEvaluationTeachingMemberForm";
import UpdateUserForm from "@/containers/UpdateUserForm";

const PeerEvaluationNavigationFab = dynamic(() => import("@/containers/PeerEvaluationNavigationFab"), { ssr: false });

export {
  CreateColumnForm,
  CreatePeerEvaluationTeachingMemberForm,
  CreateUserForm,
  DataTableEditDeleteToolbar,
  Error404,
  Error500,
  ErrorAuth,
  ErrorContainer,
  HomePageContainer,
  Layout,
  LoadingContainer,
  Navigation,
  PeerEvaluationCard,
  PeerEvaluationColumnManagement,
  PeerEvaluationNavigationFab,
  PeerEvaluationsDataTable,
  PeerEvaluationStatusContainer,
  PeerEvaluationStudentsDataTable,
  PeerEvaluationStudentTable,
  PeerEvaluationStudentTeamActionsDialog,
  SignInWrapper,
  UnauthorizedContainer,
  UpdatePeerEvaluationColumnForm,
  UpdatePeerEvaluationForm,
  UpdatePeerEvaluationTeachingMemberForm,
  UpdateUserForm,
};
