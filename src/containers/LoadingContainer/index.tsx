import React, { memo } from "react";

import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import { CenteredContent, CenteredScope } from "@/styles/global-style";

interface ILoading {
  loading: boolean;
  centeredAbsolute?: boolean;
}

const LoadingContainer = ({ loading, centeredAbsolute = true }: ILoading) => {
  if (centeredAbsolute) {
    return (
      <CenteredContent>
        <LoaderSpinner isLoading={loading} />
      </CenteredContent>
    );
  }

  return (
    <CenteredScope>
      <LoaderSpinner isLoading={loading} />
    </CenteredScope>
  );
};

export default memo(LoadingContainer);
