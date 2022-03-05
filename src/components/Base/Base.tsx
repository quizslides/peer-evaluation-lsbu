import React, { memo } from "react";

import BackArrowButton from "@/components/BackArrowButton/BackArrowButton";
import ErrorContainer from "@/containers/ErrorContainer";
import LoadingContainer from "@/containers/LoadingContainer";
import Navigation from "@/containers/Navigation";
import { TopLeft } from "@/styles/global-style";
import { ComponentChildren } from "@/types";

type TTopLeftComponent = "menu" | "backArrow" | "none";

interface IBase extends ComponentChildren {
  topLeftComponent: TTopLeftComponent;
  loading?: boolean;
  error?: boolean;
}

const TopLeftComponent: React.FC<{ topLeftComponent: TTopLeftComponent }> = ({ topLeftComponent }) => {
  switch (topLeftComponent) {
    case "menu":
      return <Navigation />;
    case "backArrow":
      return (
        <TopLeft>
          <BackArrowButton />
        </TopLeft>
      );
    default:
      return <></>;
  }
};

const Base = ({ children, topLeftComponent, loading, error }: IBase) => {
  return (
    <>
      <TopLeftComponent topLeftComponent={topLeftComponent} />
      {error ? <ErrorContainer /> : loading ? <LoadingContainer loading={loading} /> : <>{children}</>}
    </>
  );
};

export default memo(Base);
