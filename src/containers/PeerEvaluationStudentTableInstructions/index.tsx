import React, { memo, useState } from "react";

import { Button, Dialog, HtmlRenderText } from "@/components";

interface IPeerEvaluationStudentTableInstructions {
  instructions?: string;
  testId: string;
}

const PeerEvaluationStudentTableInstructions = ({ instructions, testId }: IPeerEvaluationStudentTableInstructions) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const setDialogState = (state: boolean) => setDialogOpen(state);

  if (!instructions) {
    return null;
  }

  return (
    <>
      <Button size="small" variant="outlined" testId={testId} onClick={() => setDialogState(true)}>
        Instructions
      </Button>
      <Dialog
        testId={testId}
        title="Instructions"
        maxWidth="md"
        content={<HtmlRenderText text={instructions} />}
        rightButton="Close"
        rightButtonVariant="contained"
        onClickRightButton={() => setDialogState(false)}
        isDisableLeftButton
        open={isDialogOpen}
      />
    </>
  );
};

export default memo(PeerEvaluationStudentTableInstructions);
