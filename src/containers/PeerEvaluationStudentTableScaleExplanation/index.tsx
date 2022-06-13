import React, { memo, useState } from "react";

import { Button, Dialog, HtmlRenderText } from "@/components";

interface IPeerEvaluationStudentTableScaleExplanation {
  scaleExplanation?: string;
  testId: string;
}

const PeerEvaluationStudentTableScaleExplanation = ({
  scaleExplanation,
  testId,
}: IPeerEvaluationStudentTableScaleExplanation) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const setDialogState = (state: boolean) => setDialogOpen(state);
  if (!scaleExplanation) {
    return null;
  }

  return (
    <>
      <Button size="small" variant="outlined" testId={testId} onClick={() => setDialogState(true)}>
        Scale Explanation
      </Button>
      <Dialog
        testId={testId}
        title="Scale Explanation"
        maxWidth="md"
        content={<HtmlRenderText text={scaleExplanation} />}
        rightButton="Close"
        rightButtonVariant="contained"
        onClickRightButton={() => setDialogState(false)}
        isDisableLeftButton
        open={isDialogOpen}
      />
    </>
  );
};

export default memo(PeerEvaluationStudentTableScaleExplanation);
