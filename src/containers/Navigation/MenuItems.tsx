import React, { memo, useEffect, useState } from "react";

import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useSession } from "next-auth/react";
import { NextRouter } from "next/router";

import NavigationDrawer from "@/components/NavigationDrawer/NavigationDrawer";
import NavigationExpandableItem, { IMenuItem } from "@/components/NavigationExpandableItem/NavigationExpandableItem";
import MenuTopItems from "@/containers/MenuTopItems";
import { GridViewIcon, GroupIcon, LoginIcon, LogoutIcon, People, VideogameAssetIcon } from "@/icons";
import routing from "@/routing";
import { RoleScope } from "@/utils";

interface MenuItemState {
  [key: string]: boolean;
}

interface IMenuItems {
  router: NextRouter;
}

interface IMenuItemList {
  [key: string]: IMenuItem;
}

const menuExpandableItems: IMenuItemList = {
  account: {
    scope: [RoleScope.AUTHENTICATED],
    menuTitle: "Your Account",
    menuDescription: "Manage your account",
    menuItemList: [
      { icon: <LogoutIcon testId={"menu-expandable-account"} />, label: "Sign out", pathname: routing.auth.signOut },
    ],
  },
  admin: {
    scope: [RoleScope.ADMIN],
    menuTitle: "Administrator",
    menuDescription: "Administrator menu",
    menuItemList: [
      { icon: <GroupIcon testId={"menu-expandable-admin-menu"} />, label: "Users", pathname: routing.admin.users },
    ],
  },
  modules: {
    scope: [RoleScope.ADMIN, RoleScope.LECTURER],
    menuTitle: "Your Modules",
    menuDescription: "List of all modules",
    menuItemList: [{ icon: <People testId={"menu-expandable-user-modules"} />, label: "modules1", pathname: "/" }],
  },
  sharedModules: {
    scope: [RoleScope.ADMIN, RoleScope.LECTURER],
    menuTitle: "Shared Modules",
    menuDescription: "List of shared modules with me",
    menuItemList: [
      { icon: <People testId={"menu-expandable-user-shared-modules"} />, label: "sharedModules1", pathname: "/" },
    ],
  },
};

const menuTopItems = [
  {
    title: "Dashboard",
    icon: <GridViewIcon testId={"menu-item-dashboard"} />,
    pathname: routing.dashboard,
    scope: [RoleScope.AUTHENTICATED],
  },
  {
    title: "Sign In",
    icon: <LoginIcon testId={"menu-item-sign-in"} />,
    pathname: routing.auth.signIn,
    scope: [RoleScope.UNAUTHENTICATED],
  },
  {
    title: "Playground",
    icon: <VideogameAssetIcon testId={"menu-item-playground"} />,
    pathname: routing.playground,
    scope: undefined,
  },
];

const MenuItems = ({ router }: IMenuItems) => {
  const { data: session } = useSession();

  const [open, setOpen] = useState<MenuItemState>({});

  useEffect(() => {
    setOpen(
      Object.keys(menuExpandableItems).reduce((obj, menuItemList) => {
        return { ...obj, [menuItemList]: false };
      }, {})
    );
  }, [router]);

  const updateMenuItemState = (id: string) => {
    const drawerItemsClose = Object.fromEntries(Object.keys(open).map((key) => [key, false]));
    setOpen({ ...drawerItemsClose, [id]: !open?.[id] });
  };

  const getMenuUserMessage = () => {
    if (session) {
      return `Hello, ${session?.user?.name}`;
    }

    return "Hello, Stranger";
  };

  return (
    <Box sx={{ display: "flex", height: "500%" }}>
      <Paper variant="outlined" square elevation={0} sx={{ maxWidth: 250, width: 250 }}>
        <NavigationDrawer component="nav" disablePadding>
          <ListItemButton component="a">
            <ListItemText
              sx={{ my: 0 }}
              primary={getMenuUserMessage()}
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

          <MenuTopItems router={router} menuTopItems={menuTopItems} />

          {Object.keys(menuExpandableItems).map((menuItemList) => {
            return (
              <NavigationExpandableItem
                key={menuItemList}
                id={menuItemList}
                scope={menuExpandableItems[menuItemList].scope}
                open={open[menuItemList]}
                updateState={updateMenuItemState}
                menuTitle={menuExpandableItems[menuItemList].menuTitle}
                menuDescription={menuExpandableItems[menuItemList].menuDescription}
                menuItemList={menuExpandableItems[menuItemList].menuItemList}
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
