import React, { memo } from "react";

import { User } from "@generated/type-graphql";

import PeerEvaluationTeachingMemberForm from "@/forms/PeerEvaluationTeachingMemberForm";
import { PeerEvaluationTeachingMember, initialPeerEvaluationTeachingMember } from "@/types/peer-evaluation";

interface ICreatePeerEvaluationTeachingMemberForm {
  state: boolean;
  updateFormState: (state: boolean) => void;
  onSubmit: (data: PeerEvaluationTeachingMember) => void;
  users: User[];
}

const CreatePeerEvaluationTeachingMemberForm = ({
  state,
  users,
  updateFormState,
  onSubmit,
}: ICreatePeerEvaluationTeachingMemberForm) => {
  const submitForm = (dataForm: PeerEvaluationTeachingMember) => {
    onSubmit(dataForm);
    updateFormState(false);
  };

  if (!state) {
    return null;
  }

  return (
    <PeerEvaluationTeachingMemberForm
      state={state}
      formTitle={"New Peer Evaluation Teaching Member"}
      updateFormState={updateFormState}
      onSubmitForm={submitForm}
      data={initialPeerEvaluationTeachingMember}
      users={users}
      isPeerEvaluationTeachingMemberOwner={true}
    />
  );
};

export default memo(CreatePeerEvaluationTeachingMemberForm);
