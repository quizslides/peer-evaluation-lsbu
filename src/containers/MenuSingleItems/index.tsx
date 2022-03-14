import React from "react";

import { NextRouter } from "next/router";

import MenuTopItemsWrapper from "@/components/MenuTopItemsWrapper/MenuTopItemsWrapper";
import { RoleScope } from "@/utils";

interface IMenuTopItems {
  router: NextRouter;
  menuItems: {
    title: string;
    icon: JSX.Element;
    pathname: string;
    scope: RoleScope[] | undefined;
  }[];
}

const MenuSingleItems = ({ router, menuItems }: IMenuTopItems) => {
  return (
    <>
      {menuItems.map(({ title, icon, pathname, scope }) => (
        <MenuTopItemsWrapper key={title} title={title} icon={icon} pathname={pathname} router={router} scope={scope} />
      ))}
    </>
  );
};

export default MenuSingleItems;
