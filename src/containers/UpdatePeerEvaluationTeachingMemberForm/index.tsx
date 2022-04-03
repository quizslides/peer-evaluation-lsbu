import React, { memo } from "react";

import { User } from "@generated/type-graphql";

import PeerEvaluationTeachingMemberForm from "@/forms/PeerEvaluationTeachingMemberForm";
import { PeerEvaluationTeachingMember } from "@/types/peer-evaluation";

interface IUpdatePeerEvaluationTeachingMemberForm {
  state: boolean;
  users: User[];
  updatePeerEvaluationTeachingMember: PeerEvaluationTeachingMember;
  isPeerEvaluationTeachingMemberOwner: boolean;
  updateFormState: (state: boolean) => void;
  onSubmit: (data: PeerEvaluationTeachingMember) => void;
}

const UpdatePeerEvaluationTeachingMemberForm = ({
  state,
  users,
  updatePeerEvaluationTeachingMember,
  isPeerEvaluationTeachingMemberOwner,
  updateFormState,
  onSubmit,
}: IUpdatePeerEvaluationTeachingMemberForm) => {
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
      formTitle={"Update Peer Evaluation Teaching Member"}
      updateFormState={updateFormState}
      onSubmitForm={submitForm}
      data={updatePeerEvaluationTeachingMember}
      users={users}
      isPeerEvaluationTeachingMemberOwner={isPeerEvaluationTeachingMemberOwner}
    />
  );
};

export default memo(UpdatePeerEvaluationTeachingMemberForm);
