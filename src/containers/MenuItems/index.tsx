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
import MenuSingleItems from "@/containers/MenuSingleItems";
import {
  AddIcon,
  GridViewIcon,
  GroupIcon,
  ListIcon,
  LoginIcon,
  LogoutIcon,
  VideogameAssetIcon,
  ViewModuleIcon,
} from "@/icons";
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
  admin: {
    scope: [RoleScope.ADMIN],
    menuTitle: "Administrator",
    menuDescription: "Administrator menu",
    menuItemList: [
      { icon: <GroupIcon testId={"menu-expandable-admin-users"} />, label: "Users", pathname: routing.admin.users },
      {
        icon: <ViewModuleIcon testId={"menu-expandable-admin-peer-evaluations"} />,
        label: "Peer Evaluations",
        pathname: routing.admin.peerEvaluation,
      },
    ],
  },
  peerEvaluations: {
    scope: [RoleScope.ADMIN, RoleScope.LECTURER],
    menuTitle: "Peer Evaluations",
    menuDescription: "Peer Evaluations menu",
    menuItemList: [
      {
        icon: <ListIcon testId={"menu-expandable-peer-evaluations-list"} />,
        label: "List Peer Evaluations",
        pathname: routing.peerEvaluation.list,
      },
      {
        icon: <AddIcon testId={"menu-expandable-peer-evaluations-add"} />,
        label: "Create Peer Evaluation",
        pathname: routing.peerEvaluation.create,
      },
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

const menuBottomItems = [
  {
    title: "Sign out",
    icon: <LogoutIcon testId={"menu-expandable-account"} />,
    pathname: routing.auth.signOut,
    scope: [RoleScope.AUTHENTICATED],
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
    if (session && typeof session.user.name === "string") {
      return `Hello, ${session.user.name}`;
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

          <MenuSingleItems router={router} menuItems={menuTopItems} />

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

          <MenuSingleItems router={router} menuItems={menuBottomItems} />
        </NavigationDrawer>
      </Paper>
    </Box>
  );
};

export default memo(MenuItems);
