import React from "react";

import { useRouter } from "next/router";

import IconButtonWrapper from "@/components/IconButtonWrapper/IconButtonWrapper";
import { ArrowBackIcon } from "@/icons";

const BackArrowButton = () => {
  const router = useRouter();

  const goBack = () => {
    if (document.referrer.indexOf(window.location.hostname) === -1) {
      router.push("/");
    } else {
      router.back();
    }
  };

  return (
    <IconButtonWrapper onClick={goBack}>
      <ArrowBackIcon testId="goback-arrow-button" fontSize="large" color="inherit" />
    </IconButtonWrapper>
  );
};

export default BackArrowButton;
