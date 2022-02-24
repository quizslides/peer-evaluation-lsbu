import React from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import LoginIcon from "@mui/icons-material/Login";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { NextRouter } from "next/router";

import MenuTopItemsWrapper from "@/components/MenuTopItemsWrapper/MenuTopItemsWrapper";
import routing from "@/routing";
import { RoleScope } from "@/utils/permissions";

interface IMenuTopItems {
  router: NextRouter;
}

const MenuTopItems = ({ router }: IMenuTopItems) => {
  const menuTopItems = [
    {
      title: "Dashboard",
      icon: <GridViewIcon />,
      pathname: routing.dashboard,
      scope: [RoleScope.AUTHENTICATED],
    },
    {
      title: "Student",
      icon: <GridViewIcon />,
      pathname: routing.dashboard,
      scope: [RoleScope.STUDENT],
    },
    {
      title: "Sign In",
      icon: <LoginIcon />,
      pathname: routing.auth.signIn,
      scope: [RoleScope.UNAUTHENTICATED],
    },
    {
      title: "Playground",
      icon: <VideogameAssetIcon />,
      pathname: routing.playground,
      scope: undefined,
    },
  ];

  return (
    <>
      {menuTopItems.map(({ title, icon, pathname, scope }) => (
        <MenuTopItemsWrapper key={title} title={title} icon={icon} pathname={pathname} router={router} scope={scope} />
      ))}
    </>
  );
};

export default MenuTopItems;
