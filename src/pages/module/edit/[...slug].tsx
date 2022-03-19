import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import { UpdateModuleForm } from "@/containers";
import CreateModuleForm from "@/containers/CreateModuleForm";
import useGetModule from "@/requests/hooks/query/useGetModule";
import routing from "@/routing";
import { RoleScope } from "@/utils";

const UpdateModule: NextPage = () => {
  const { push, query, isFallback } = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const [moduleId, setModuleId] = useState<string | null>(null);

  const [isError, setIsError] = useState<boolean>(false);

  const setError = () => {
    setIsError(true);
  };

  const getRedirectUrlOnAction = () => {
    if (typeof query.redirectUrl === "string") {
      return query.redirectUrl;
    }

    return routing.dashboard;
  };

  const onSubmitUpdateModule = () => {
    redirectUserOnAction();
  };

  const onCancelUpdateModule = () => {
    redirectUserOnAction();
  };

  const redirectUserOnAction = () => {
    setRedirecting(true);
    push(getRedirectUrlOnAction());
  };

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug)) {
      setModuleId(slug[0]);
    }
  }, [query.slug]);

  return (
    <Base topLeftComponent="menu" loading={isRedirecting || isFallback || !moduleId} error={isError}>
      <PageTitle title={"Update Module"} testId="page-update-module-title" variant="h4" margin="2em" />
      {moduleId && (
        <UpdateModuleForm
          setError={setError}
          onSubmit={onSubmitUpdateModule}
          onCancel={onCancelUpdateModule}
          moduleId={moduleId}
        />
      )}
    </Base>
  );
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
};

export default UpdateModule;
