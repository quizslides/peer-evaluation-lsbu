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
import { GridViewIcon, GroupIcon, LoginIcon, LogoutIcon, ViewModuleIcon } from "@/icons";
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
    menuDescription: "Administrator Access",
    menuItemList: [
      { icon: <GroupIcon testId={"menu-expandable-admin-users"} />, label: "Users", pathname: routing.admin.users },
      {
        icon: <ViewModuleIcon testId={"menu-expandable-admin-peer-evaluations"} />,
        label: "Admin Peer Evaluations",
        pathname: routing.admin.peerEvaluation,
      },
      {
        icon: <ViewModuleIcon testId={"menu-expandable-admin-peer-evaluations"} />,
        label: "Lecturer Peer Evaluations",
        pathname: routing.lecturer.peerEvaluations,
      },
      {
        icon: <ViewModuleIcon testId={"menu-expandable-admin-peer-evaluations"} />,
        label: "Student Peer Evaluations",
        pathname: routing.student.peerEvaluations,
      },
    ],
    testId: "menu-expandable-item-administrator-access",
  },
};

const menuTopItems = [
  {
    title: "Peer Evaluations",
    icon: <GridViewIcon testId={"menu-item-dashboard-lecturer"} />,
    pathname: routing.lecturer.peerEvaluations,
    scope: [RoleScope.LECTURER],
  },
  {
    title: "Peer Evaluations",
    icon: <GridViewIcon testId={"menu-item-dashboard-student"} />,
    pathname: routing.student.peerEvaluations,
    scope: [RoleScope.STUDENT],
  },
];

const menuBottomItems = [
  {
    title: "Sign In",
    icon: <LoginIcon testId={"menu-item-sign-in"} />,
    pathname: routing.auth.signIn,
    scope: [RoleScope.UNAUTHENTICATED],
  },
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

          {session && session.user.role !== "ADMIN" && <MenuSingleItems router={router} menuItems={menuTopItems} />}

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
                testId={menuExpandableItems[menuItemList].testId}
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
