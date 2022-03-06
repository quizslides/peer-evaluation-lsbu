import React from "react";

import { Base, LoaderSpinner } from "@/components";
import { CenteredContent } from "@/styles";
import { ComponentChildren } from "@/types";

interface ISignInWrapper extends ComponentChildren {
  loading: boolean;
}

const SignInWrapper = ({ children, loading }: ISignInWrapper) => {
  return (
    <Base topLeftComponent="backArrow">
      <CenteredContent>
        <LoaderSpinner isLoading={loading}>{children}</LoaderSpinner>
      </CenteredContent>
    </Base>
  );
};

export default SignInWrapper;
