import React, { memo } from "react";

import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import { CenteredContent } from "@/styles/global-style";

interface ILoading {
  loading: boolean;
}

const LoadingContainer = ({ loading }: ILoading) => {
  return (
    <CenteredContent>
      <LoaderSpinner isLoading={loading} />
    </CenteredContent>
  );
};

export default memo(LoadingContainer);
