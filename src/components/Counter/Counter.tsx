import React, { memo } from "react";

import Typography from "@/components/Typography/Typography";

const Counter = ({ seconds }: { seconds: number }) => {
  return (
    <Typography variant="subtitle1" testId={""}>
      Sending another code is temporarily disabled. Please wait for {seconds} seconds before requesting a new one.
    </Typography>
  );
};

export default memo(Counter);
