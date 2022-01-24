import * as React from "react";

import { Button as ButtonMUI } from "@mui/material";

export default function Button() {
  return (
    <ButtonMUI
      onClick={() => {
        throw new Error("Sentry Frontend Error");
      }}
      variant="contained"
    >
      Hello from a button
    </ButtonMUI>
  );
}
