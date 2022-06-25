import React, { memo, useEffect, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useRouter } from "next/router";

import IconButtonWrapper from "@/components/IconButtonWrapper/IconButtonWrapper";
import MenuItems from "@/containers/MenuItems";
import { MenuIcon } from "@/icons";

const Navigation = () => {
  const [isOpenNavigation, setOpenNavigation] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setOpenNavigation(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, router]);

  const toggleNavigation = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpenNavigation(open);
  };

  return (
    <>
      <IconButtonWrapper onClick={toggleNavigation(true)} testId={"navigation-menu-button-wrapper"}>
        <MenuIcon testId="navigation-menu-button" sx={{ color: router.pathname === "/" ? "white" : "inherit" }} />
      </IconButtonWrapper>
      <SwipeableDrawer open={isOpenNavigation} onClose={toggleNavigation(false)} onOpen={toggleNavigation(true)}>
        <ThemeProvider
          theme={createTheme({
            components: {},
            palette: {
              mode: "dark",
            },
          })}
        >
          <MenuItems router={router} />
        </ThemeProvider>
      </SwipeableDrawer>
    </>
  );
};

export default memo(Navigation);
