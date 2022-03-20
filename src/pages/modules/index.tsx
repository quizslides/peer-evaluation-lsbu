import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import { useSession } from "next-auth/react";

import { ModulesDataTable } from "@/containers";
import useGetModulesByLecturer from "@/requests/hooks/query/useGetModulesByLecturer";
import routing from "@/routing";
import { IModuleDataTable, Schools, SchoolsDropdown } from "@/types/module";
import { RoleScope } from "@/utils";

const Modules: NextPage = () => {
  const { data: session, status } = useSession();

  const [module, { loading: loadingQuery, error, data, refetch: runRefreshModules }] =
    useGetModulesByLecturer("AllModules");

  const loading = status === "loading" || loadingQuery;

  const [modulesData, setModulesData] = useState<IModuleDataTable[]>([]);

  useEffect(() => {
    if (data) {
      let moduleData = data?.modulesByLecturer as unknown as IModuleDataTable[];
      for (let index in moduleData) {
        moduleData[index].schoolsDataTable = moduleData[index].schools.map(
          (school) => SchoolsDropdown[school]
        ) as Schools[];
      }

      setModulesData(moduleData);
    }
  }, [data]);

  useEffect(() => {
    if (session && session.user.email) {
      module({
        variables: {
          where: {
            email: session.user.email,
          },
        },
      });
    }
  }, [module, session]);

  return (
    <ModulesDataTable
      redirectUrl={routing.modules.list}
      isLoading={loading}
      modulesData={modulesData}
      isError={!!error}
      refreshModules={runRefreshModules}
      session={session}
      testId={"page-modules"}
    />
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

export default Modules;
