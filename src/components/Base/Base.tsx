import React, { memo } from "react";

import TopLeftComponent from "@/components/TopLeftComponent/TopLeftComponent";
import ErrorContainer from "@/containers/ErrorContainer";
import LoadingContainer from "@/containers/LoadingContainer";
import { ComponentChildren } from "@/types";

type TTopLeftComponent = "menu" | "backArrow" | "none";

interface IBase extends ComponentChildren {
  topLeftComponent: TTopLeftComponent;
  loading?: boolean;
  error?: boolean;
}

const Base = ({ children, topLeftComponent, loading, error }: IBase) => {
  return (
    <>
      <TopLeftComponent topLeftComponent={topLeftComponent} />
      {error ? <ErrorContainer /> : loading ? <LoadingContainer loading={loading} /> : <>{children}</>}
    </>
  );
};

Base.defaultProps = { error: false, loading: false };

export default memo(Base);
