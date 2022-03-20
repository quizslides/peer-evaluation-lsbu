import React, { useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import CreateModuleForm from "@/containers/CreateModuleForm";
import routing from "@/routing";
import { RoleScope } from "@/utils";

const CreateModule: NextPage = () => {
  const router = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const getRedirectUrlOnAction = () => {
    if (typeof router.query.redirectUrl === "string") {
      return router.query.redirectUrl;
    }

    return routing.dashboard;
  };

  const onSubmitCreateModule = () => {
    redirectUserOnAction();
  };

  const onCancelCreateModule = () => {
    redirectUserOnAction();
  };

  const redirectUserOnAction = () => {
    setRedirecting(true);
    router.push(getRedirectUrlOnAction());
  };

  return (
    <Base topLeftComponent="menu" loading={isRedirecting}>
      <PageTitle title={"Create Module"} testId="page-create-module-title" variant="h4" margin="2em" />
      <CreateModuleForm onSubmit={onSubmitCreateModule} onCancel={onCancelCreateModule} />
    </Base>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
};

export default CreateModule;
