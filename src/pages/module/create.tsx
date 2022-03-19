import React, { useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import CreateModuleForm from "@/containers/CreateModuleForm";
import routing from "@/routing";
import { RoleScope } from "@/utils";

// HERE - Left here Add redirect from admin to this page
const CreateModule: NextPage = () => {
  const router = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const getRedirectUrlOnSubmit = () => {
    if (typeof router.query.redirectUrl === "string") {
      return router.query.redirectUrl;
    }

    return routing.dashboard;
  };

  const onSubmitCreateForm = () => {
    setRedirecting(true);
    router.push(getRedirectUrlOnSubmit());
  };

  return (
    <Base topLeftComponent="menu" loading={isRedirecting}>
      <PageTitle title={"Create Module"} testId="page-create-module-title" variant="h4" margin="2em" />
      <CreateModuleForm onSubmit={onSubmitCreateForm} />
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
