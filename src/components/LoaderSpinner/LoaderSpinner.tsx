import React from "react";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

import { ComponentChildren } from "@/types";

export interface IClipLoader extends ComponentChildren {
  isLoading: boolean;
  size?: number;
  color?: string;
}

export const defaultLoaderProps: IClipLoader = {
  isLoading: false,
  size: 150,
  color: "primary",
  children: <></>,
};

export const overrideCss = css`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const LoaderSpinner = (props: IClipLoader) => {
  const { size, color, isLoading, children } = props;

  if (isLoading) {
    return <ClipLoader css={overrideCss} size={size} color={color} loading={isLoading} />;
  }

  return <>{children}</>;
};

LoaderSpinner.defaultProps = defaultLoaderProps;

export default LoaderSpinner;
