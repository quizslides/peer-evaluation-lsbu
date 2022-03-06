import React, { memo } from "react";

import BackArrowButton from "@/components/BackArrowButton/BackArrowButton";
import Navigation from "@/containers/Navigation";
import { TopLeft } from "@/styles/global-style";

type TTopLeftComponent = "menu" | "backArrow" | "none";

const TopLeftComponent: React.FC<{ topLeftComponent: TTopLeftComponent }> = ({ topLeftComponent }) => {
  const getComponent = (component: string) => {
    switch (component) {
      case "menu":
        return <Navigation />;
      case "backArrow":
        return <BackArrowButton />;
      default:
        return null;
    }
  };

  return <TopLeft>{getComponent(topLeftComponent)}</TopLeft>;
};

export default memo(TopLeftComponent);
