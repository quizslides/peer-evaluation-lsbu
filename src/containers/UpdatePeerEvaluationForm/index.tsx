import React, { memo, useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { Session } from "next-auth";

import LoadingContainer from "@/containers/LoadingContainer";
import { PeerEvaluationForm } from "@/forms";
import updatePeerEvaluation from "@/requests/direct/mutation/updatePeerEvaluation";
import useGetPeerEvaluation from "@/requests/hooks/query/useGetPeerEvaluation";
import { sanitizePeerEvaluationDataOnFetch, sanitizePeerEvaluationDataOnUpdate } from "@/transformers/peer-evaluation";
import {
  IPeerEvaluationData,
  PeerEvaluationColumnAction,
  PeerEvaluationTeachingMember,
  PeerEvaluationTeachingMemberRoles,
} from "@/types/peer-evaluation";
import { Role, blankNotification, errorNotification, loadingNotification, successNotification } from "@/utils";

interface IUpdateUserForm {
  onSubmit: () => void;
  onCancel: () => void;
  setError: () => void;
  peerEvaluationId: string;
  session: Session;
}

const UpdatePeerEvaluationForm = ({ onSubmit, onCancel, setError, peerEvaluationId, session }: IUpdateUserForm) => {
  const apolloClient = useApolloClient();

  const [peerEvaluationValues, setPeerEvaluationValues] = useState<IPeerEvaluationData | null>(null);

  const [isPeerEvaluationViewOnly, setPeerEvaluationViewOnly] = useState<boolean | null>(null);

  const [getPeerEvaluation, { loading: loadingFetch, error, data }] = useGetPeerEvaluation("UpdatePeerEvaluation");

  const submitForm = async (valuesForm: IPeerEvaluationData) => {
    loadingNotification("Updating peer evaluation", "UpdatePeerEvaluationForm");

    const peerEvaluationDataSanitizedOnUpdate = sanitizePeerEvaluationDataOnUpdate(valuesForm);

    const columnListToClear = valuesForm.columns.filter(
      ({ action }) => action === PeerEvaluationColumnAction.CLEAR_RESULTS
    );

    const columnListToClearId = columnListToClear.length ? columnListToClear.flatMap(({ id }) => id) : [];

    const { errors } = await updatePeerEvaluation(
      apolloClient,
      peerEvaluationDataSanitizedOnUpdate,
      peerEvaluationId,
      columnListToClearId
    );

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

  const isLoading = loadingFetch || !peerEvaluationValues;

  useEffect(() => {
    getPeerEvaluation({
      variables: {
        where: {
          id: peerEvaluationId,
        },
        orderBy: [
          {
            createdAt: "asc",
          },
        ],
      },
    });
  }, [getPeerEvaluation, peerEvaluationId]);

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
      blankNotification("You have view only permission of this peer evaluation");
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
      maxMarkIncrease={peerEvaluationValues.maxMarkIncrease}
      maxMarkDecrease={peerEvaluationValues.maxMarkDecrease}
      submissionsLockDate={peerEvaluationValues.submissionsLockDate}
      emailSubjectReminder={peerEvaluationValues.emailSubjectReminder}
      emailBodyReminder={peerEvaluationValues.emailBodyReminder}
      criteriaScoreRangeMin={peerEvaluationValues.criteriaScoreRangeMin}
      criteriaScoreRangeMax={peerEvaluationValues.criteriaScoreRangeMax}
      columns={peerEvaluationValues.columns}
      peerEvaluationTeachingMembers={peerEvaluationValues.peerEvaluationTeachingMembers}
      instructions={peerEvaluationValues.instructions}
      scaleExplanation={peerEvaluationValues.scaleExplanation}
      onSubmitForm={submitForm}
      onCancelForm={onCancel}
      session={session}
    />
  );
};

export default memo(UpdatePeerEvaluationForm);
