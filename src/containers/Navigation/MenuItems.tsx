import React, { memo, useEffect, useState } from "react";

import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import People from "@mui/icons-material/People";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useSession } from "next-auth/react";
import { NextRouter } from "next/router";

import NavigationDrawer from "@/components/NavigationDrawer/NavigationDrawer";
import NavigationExpandableItem, { IMenuItem } from "@/components/NavigationExpandableItem/NavigationExpandableItem";
import MenuTopItems from "@/containers/Navigation/MenuTopItems";
import routing from "@/routing";
import { ROLE } from "@/utils/permissions";

interface MenuItemState {
  [key: string]: boolean;
}

interface IMenuItems {
  router: NextRouter;
}

interface IMenuItemList {
  [key: string]: IMenuItem;
}

const menuExpendablesItems: IMenuItemList = {
  admin: {
    scope: [ROLE.ADMIN],
    menuTitle: "Administrator",
    menuDescription: "Administrator menu",
    menuItemList: [{ icon: <GroupIcon />, label: "Users", pathname: routing.admin.users }],
  },
  account: {
    scope: [ROLE.AUTHENTICATED],
    menuTitle: "Your Account",
    menuDescription: "Manage your account",
    menuItemList: [{ icon: <LogoutIcon />, label: "Sign out", pathname: routing.auth.signOut }],
  },
  modules: {
    scope: [ROLE.ADMIN, ROLE.LECTURER],
    menuTitle: "Your Modules",
    menuDescription: "List of all modules",
    menuItemList: [{ icon: <People />, label: "modules1", pathname: "/" }],
  },
  sharedModules: {
    scope: [ROLE.ADMIN, ROLE.LECTURER],
    menuTitle: "Shared Modules",
    menuDescription: "List of shared modules with me",
    menuItemList: [{ icon: <People />, label: "sharedModules1", pathname: "/" }],
  },
};

const MenuItems = ({ router }: IMenuItems) => {
  const { data: session } = useSession();

  const [open, setOpen] = useState<MenuItemState>({});

  useEffect(() => {
    setOpen(
      Object.keys(menuExpendablesItems).reduce((obj, menuItemList) => {
        return { ...obj, [menuItemList]: false };
      }, {})
    );
  }, [router]);

  const updateMenuItemState = (id: string) => {
    const drawerItemsClose = Object.fromEntries(Object.keys(open).map((key) => [key, false]));
    setOpen({ ...drawerItemsClose, [id]: !open?.[id] });
  };

  return (
    <Box sx={{ display: "flex", height: "500%" }}>
      <Paper variant="outlined" square elevation={0} sx={{ maxWidth: 250, width: 250 }}>
        <NavigationDrawer component="nav" disablePadding>
          <ListItemButton component="a">
            <ListItemText
              sx={{ my: 0 }}
              primary={`Hello, ${session?.user?.name || "Stranger"}`}
              primaryTypographyProps={{
                noWrap: true,
                fontSize: 20,
                fontWeight: "medium",
                letterSpacing: 0,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            />
          </ListItemButton>

          <MenuTopItems router={router} />

          {Object.keys(menuExpendablesItems).map((menuItemList) => {
            return (
              <NavigationExpandableItem
                key={menuItemList}
                id={menuItemList}
                scope={menuExpendablesItems[menuItemList].scope}
                open={open[menuItemList]}
                updateState={updateMenuItemState}
                menuTitle={menuExpendablesItems[menuItemList].menuTitle}
                menuDescription={menuExpendablesItems[menuItemList].menuDescription}
                menuItemList={menuExpendablesItems[menuItemList].menuItemList}
                router={router}
              />
            );
          })}
          <Divider />
        </NavigationDrawer>
      </Paper>
    </Box>
  );
};

export default memo(MenuItems);
