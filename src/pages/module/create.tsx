import React from "react";

import { NextPage } from "next";

import { Base, PageTitle } from "@/components";
import CreateModuleForm from "@/containers/CreateModuleForm";
import { RoleScope } from "@/utils";

const CreateModule: NextPage = () => {
  // const [isCreateModuleFormOpen, setCreateModuleFormOpen] = useState(false);

  return (
    <Base topLeftComponent="menu" loading={false}>
      <PageTitle title={"Create Module"} testId="page-module-create-title" variant="h4" margin="2em" />
      <CreateModuleForm updateFormState={() => console.log("updateModuleFormState")} />
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
