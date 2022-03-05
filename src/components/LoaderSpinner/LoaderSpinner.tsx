import React, { memo } from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ClipLoader from "react-spinners/ClipLoader";

import { ComponentChildren } from "@/types";

export interface IClipLoader extends ComponentChildren {
  isLoading: boolean;
  size?: number;
  color?: string;
}

export const overrideCss = css`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const WrapperLoader = styled.div``;

const LoaderSpinner = (props: IClipLoader) => {
  const { size, color, isLoading, children } = props;

  if (isLoading) {
    return (
      <WrapperLoader data-testid="loader-spinner">
        <ClipLoader css={overrideCss} size={size} color={color} loading={isLoading} />
      </WrapperLoader>
    );
  }

  return <>{children}</>;
};

LoaderSpinner.defaultProps = {
  size: 150,
  color: "primary",
};

export default memo(LoaderSpinner);
