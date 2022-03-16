import React, { memo } from "react";

import Error from "@/components/Error/Error";
import { CenteredContent } from "@/styles";

const ErrorContainer = () => {
  return (
    <CenteredContent>
      <Error />
    </CenteredContent>
  );
};

export default memo(ErrorContainer);
