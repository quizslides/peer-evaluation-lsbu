import React, { memo } from "react";

import styled from "@emotion/styled";
import ClipLoader from "react-spinners/ClipLoader";

import { ComponentChildren } from "@/types";

export interface IClipLoader extends ComponentChildren {
  isLoading: boolean;
  size?: number;
  color?: string;
}

const WrapperLoader = styled.div``;

const LoaderSpinner = (props: IClipLoader) => {
  const { size, color, isLoading, children } = props;

  if (isLoading) {
    return (
      <WrapperLoader data-testid="loader-spinner">
        <ClipLoader size={size} color={color} loading={isLoading} />
      </WrapperLoader>
    );
  }

  return <>{children}</>;
};

LoaderSpinner.defaultProps = {
  size: 150,
  color: "primary",
  children: null, // skipcq: JS-0391
};

export default memo(LoaderSpinner);
