import React, { memo } from "react";

import { useRouter } from "next/router";

import IconButtonWrapper from "@/components/IconButtonWrapper/IconButtonWrapper";
import { HelpOutlineIcon } from "@/icons";
import routing from "@/routing";

const HelpButton = () => {
  const router = useRouter();

  return (
    <IconButtonWrapper
      tooltip="Help"
      onClick={() => router.push(routing.home)}
      testId={"routing-help-page-icon-wrapper"}
    >
      <HelpOutlineIcon testId="routing-help-page" color="inherit" />
    </IconButtonWrapper>
  );
};

export default memo(HelpButton);
