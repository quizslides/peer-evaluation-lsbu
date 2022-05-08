import React, { memo, useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import LoadingContainer from "@/containers/LoadingContainer";
import { PeerEvaluationForm } from "@/forms";
import updatePeerEvaluation from "@/requests/direct/mutation/updatePeerEvaluation";
import useGetPeerEvaluation from "@/requests/hooks/query/useGetPeerEvaluation";
import { sanitizePeerEvaluationDataOnFetch, sanitizePeerEvaluationDataOnUpdate } from "@/transformers/peer-evaluation";
import {
  IPeerEvaluationData,
  PeerEvaluationTeachingMember,
  PeerEvaluationTeachingMemberRoles,
} from "@/types/peer-evaluation";
import { Role, blankNotification, errorNotification, loadingNotification, successNotification } from "@/utils";

interface IUpdateUserForm {
  onSubmit: () => void;
  onCancel: () => void;
  setError: () => void;
  peerEvaluationId: string;
}

const UpdatePeerEvaluationForm = ({ onSubmit, onCancel, setError, peerEvaluationId }: IUpdateUserForm) => {
  const apolloClient = useApolloClient();

  const [peerEvaluationValues, setPeerEvaluationValues] = useState<IPeerEvaluationData | null>(null);

  const [isPeerEvaluationViewOnly, setPeerEvaluationViewOnly] = useState<boolean | null>(null);

  const [getPeerEvaluations, { loading: loadingFetch, error, data }] = useGetPeerEvaluation("UpdatePeerEvaluation");

  const { data: session, status } = useSession();

  const submitForm = async (valuesForm: IPeerEvaluationData) => {
    loadingNotification("Updating peer evaluation", "UpdatePeerEvaluationForm");

    const peerEvaluationDataSanitizedOnUpdate = sanitizePeerEvaluationDataOnUpdate(valuesForm);

    const { errors } = await updatePeerEvaluation(apolloClient, peerEvaluationDataSanitizedOnUpdate, peerEvaluationId);

    if (!errors) {
      successNotification("Peer Evaluation updated successfully", "UpdatePeerEvaluationForm");
    } else {
      // TODO: Create a granular error notification to the user with all the errors
      errorNotification("Error updating peer evaluation", "UpdatePeerEvaluationForm");
    }

    onSubmit();
  };

  const isPeerEvaluationTeachingMemberViewOnly = (
    peerEvaluationTeachingMember: PeerEvaluationTeachingMember[] | undefined,
    session: Session
  ) => {
    if (session.user.role === Role.ADMIN) {
      return false;
    }

    if (peerEvaluationTeachingMember) {
      const userPeerEvaluationTeachingMember = peerEvaluationTeachingMember.filter(
        ({ email }) => email === session?.user.email
      );
      if (userPeerEvaluationTeachingMember.length) {
        return userPeerEvaluationTeachingMember[0].role === PeerEvaluationTeachingMemberRoles.VIEWER;
      }
    }

    return false;
  };

  const isLoading = status === "loading" || loadingFetch || !peerEvaluationValues;

  useEffect(() => {
    getPeerEvaluations({
      variables: {
        where: {
          id: peerEvaluationId,
        },
      },
    });
  }, [getPeerEvaluations, peerEvaluationId]);

  useEffect(() => {
    if (error) {
      setError();
    }
  }, [error, setError]);

  useEffect(() => {
    if (data && session) {
      const sanitizedPeerEvaluationDataOnFetch = sanitizePeerEvaluationDataOnFetch(data.peerEvaluation);

      setPeerEvaluationValues(sanitizedPeerEvaluationDataOnFetch || null);

      setPeerEvaluationViewOnly(
        isPeerEvaluationTeachingMemberViewOnly(
          sanitizedPeerEvaluationDataOnFetch?.peerEvaluationTeachingMembers,
          session
        )
      );
    }
  }, [data, session]);

  useEffect(() => {
    if (isPeerEvaluationViewOnly) {
      blankNotification("You have permission view only permission view only of this peer evaluation");
    }
  }, [isPeerEvaluationViewOnly]);

  if (isLoading) {
    return <LoadingContainer loading={isLoading} />;
  }

  return (
    <PeerEvaluationForm
      id={peerEvaluationValues.id}
      isNewPeerEvaluation={false}
      isViewOnly={!!isPeerEvaluationViewOnly}
      title={peerEvaluationValues.title}
      code={peerEvaluationValues.code}
      schools={peerEvaluationValues.schools}
      status={peerEvaluationValues.status}
      maxGradeIncrease={peerEvaluationValues.maxGradeIncrease}
      maxGradeDecrease={peerEvaluationValues.maxGradeDecrease}
      submissionsLockDate={peerEvaluationValues.submissionsLockDate}
      emailSubjectReminder={peerEvaluationValues.emailSubjectReminder}
      emailBodyReminder={peerEvaluationValues.emailBodyReminder}
      criteriaScoreRangeMin={peerEvaluationValues.criteriaScoreRangeMin}
      criteriaScoreRangeMax={peerEvaluationValues.criteriaScoreRangeMax}
      columns={peerEvaluationValues.columns}
      peerEvaluationTeachingMembers={peerEvaluationValues.peerEvaluationTeachingMembers}
      onSubmitForm={submitForm}
      onCancelForm={onCancel}
    />
  );
};

export default memo(UpdatePeerEvaluationForm);
