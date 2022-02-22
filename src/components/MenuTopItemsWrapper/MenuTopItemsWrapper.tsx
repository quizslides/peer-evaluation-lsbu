import React from "react";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NextRouter } from "next/router";

import AuthScopeContainer from "@/containers/AuthScopeContainer";
import { RoleScope } from "@/utils/permissions";

interface IMenuTopItemsWrapper extends RoleScope {
  title: string;
  icon: JSX.Element;
  pathname: string;
  router: NextRouter;
}

const MenuTopItemsWrapper = ({ title, icon, router, pathname, scope }: IMenuTopItemsWrapper) => {
  return (
    <AuthScopeContainer scope={scope}>
      <>
        <Divider />
        <ListItem component="div" disablePadding>
          <ListItemButton component="a" sx={{ height: 56 }} onClick={() => router.push(pathname)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText
              primary={title}
              primaryTypographyProps={{
                color: "inherit",
                fontWeight: "medium",
                variant: "body2",
              }}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
      </>
    </AuthScopeContainer>
  );
};

export default MenuTopItemsWrapper;
