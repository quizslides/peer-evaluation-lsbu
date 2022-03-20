import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import { useSession } from "next-auth/react";

import { ModulesDataTable } from "@/containers";
import useGetModules from "@/requests/hooks/query/useGetModules";
import routing from "@/routing";
import { IModuleDataTable, Schools, SchoolsDropdown } from "@/types/module";
import { RoleScope } from "@/utils";

const ModulesAdmin: NextPage = () => {
  const { data: session, status } = useSession();

  const { data, loading: loadingQuery, error, refetch: runRefreshModules } = useGetModules();

  const loading = status === "loading" || loadingQuery;

  const [modulesData, setModulesData] = useState<IModuleDataTable[]>([]);

  useEffect(() => {
    if (data) {
      let moduleData = data?.modules as unknown as IModuleDataTable[];
      for (let index in moduleData) {
        moduleData[index].schoolsDataTable = moduleData[index].schools.map(
          (school) => SchoolsDropdown[school]
        ) as Schools[];
      }

      setModulesData(moduleData);
    }
  }, [data]);

  return (
    <ModulesDataTable
      redirectUrl={routing.admin.modules}
      isLoading={loading}
      modulesData={modulesData}
      isError={!!error}
      refreshModules={runRefreshModules}
      session={session}
      testId={"page-admin-modules"}
    />
  );
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN],
    },
  };
};

export default ModulesAdmin;
