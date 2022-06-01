import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import { LoadingContainer } from "@/containers";
import { PeerEvaluationForm } from "@/forms";
import createPeerEvaluation from "@/requests/direct/mutation/createPeerEvaluation";
import { sanitizePeerEvaluationDataOnCreate } from "@/transformers/peer-evaluation";
import { IPeerEvaluationData, initialPeerEvaluationState } from "@/types/peer-evaluation";
import { errorNotification, loadingNotification, successNotification } from "@/utils";

interface ICreateUserForm {
  onSubmit: () => void;
  onCancel: () => void;
}

const CreatePeerEvaluationForm = ({ onSubmit, onCancel }: ICreateUserForm) => {
  const { data: session, status } = useSession();

  const apolloClient = useApolloClient();

  const [peerEvaluationValues, setPeerEvaluationValues] = useState(initialPeerEvaluationState);

  const submitForm = async (valuesForm: IPeerEvaluationData) => {
    loadingNotification("Creating peer evaluation", "CreatePeerEvaluationForm");

    const peerEvaluationDataSanitizedOnCreate = sanitizePeerEvaluationDataOnCreate(valuesForm);

    const { errors } = await createPeerEvaluation(apolloClient, peerEvaluationDataSanitizedOnCreate);

    if (!errors) {
      successNotification("Peer Evaluation created successfully", "CreatePeerEvaluationForm");
    } else {
      // TODO: Create a granular error notification to the user with all the errors
      errorNotification("Error creating peer evaluation", "CreatePeerEvaluationForm");
    }

    onSubmit();
  };

  const loading = status === "loading";

  useEffect(() => {
    if (session) {
      const setCurrentUserAsOwner = (peerEvaluationData: IPeerEvaluationData, session: Session) => {
        peerEvaluationData.peerEvaluationTeachingMembers[0].email =
          typeof session.user.email === "string" ? session.user.email : "";
        peerEvaluationData.peerEvaluationTeachingMembers[0].name =
          typeof session.user.name === "string" ? session.user.name : "";
        peerEvaluationData.peerEvaluationTeachingMembers[0].id =
          typeof session.user.id === "string" ? session.user.id : "";
        setPeerEvaluationValues(peerEvaluationData);
      };

      const peerEvaluationValuesUpdated = peerEvaluationValues;

      setCurrentUserAsOwner(peerEvaluationValuesUpdated, session);
    }
  }, [session, peerEvaluationValues]);

  if (loading) {
    return <LoadingContainer loading={loading} />;
  }

  return (
    <PeerEvaluationForm
      id={peerEvaluationValues.id}
      isNewPeerEvaluation={true}
      isViewOnly={false}
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
      onSubmitForm={submitForm}
      onCancelForm={onCancel}
    />
  );
};

export default CreatePeerEvaluationForm;
