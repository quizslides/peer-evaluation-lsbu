import React from "react";

import { NextRouter } from "next/router";

import MenuTopItemsWrapper from "@/components/MenuTopItemsWrapper/MenuTopItemsWrapper";
import { RoleScope } from "@/utils";

interface IMenuTopItems {
  router: NextRouter;
  menuTopItems: {
    title: string;
    icon: JSX.Element;
    pathname: string;
    scope: RoleScope[] | undefined;
  }[];
}

const MenuTopItems = ({ router, menuTopItems }: IMenuTopItems) => {
  return (
    <>
      {menuTopItems.map(({ title, icon, pathname, scope }) => (
        <MenuTopItemsWrapper key={title} title={title} icon={icon} pathname={pathname} router={router} scope={scope} />
      ))}
    </>
  );
};

export default MenuTopItems;
