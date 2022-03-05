import React, { memo } from "react";

import { Box } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NextRouter } from "next/router";

import AuthScopeContainer from "@/containers/AuthScopeContainer";
import { KeyboardArrowDown } from "@/icons";
import { RoleScope } from "@/utils/permissions";

export interface IMenuItem {
  scope: RoleScope[] | undefined;
  menuTitle: string;
  menuDescription: string;
  menuItemList: {
    icon: JSX.Element;
    label: string;
    pathname: string;
  }[];
}

interface IExpandableMenuItem extends IMenuItem {
  id: string;
  open: boolean;
  updateState(id: string): void;
  router: NextRouter;
}

const NavigationExpandableItem = ({
  id,
  open,
  updateState,
  menuTitle,
  menuDescription,
  menuItemList,
  router,
  scope,
}: IExpandableMenuItem) => {
  return (
    <AuthScopeContainer scope={scope}>
      <Box
        sx={{
          bgcolor: open ? "rgba(77, 77, 77, 0.8)" : null,
          pb: open ? 2 : 0,
        }}
      >
        <ListItemButton
          alignItems="flex-start"
          onClick={() => updateState(id)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: open ? 0 : 2.5,
            "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary={menuTitle}
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            secondary={menuDescription}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px",
              color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            testId="navigation-expandable-item-keyboard-arrow-down"
            sx={{
              mr: -1,
              opacity: 0,
              transform: open ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
        {open &&
          menuItemList.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
              onClick={() => router.push(item.pathname)}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }} />
            </ListItemButton>
          ))}
      </Box>
    </AuthScopeContainer>
  );
};

export default memo(NavigationExpandableItem);
