import React from "react";

interface ComponentChildren {
  children: React.ReactNode;
}

interface ElementChildren {
  children: JSX.Element;
}

declare module "*module.css" {
  const styles: {
    [className: string]: string;
  };

  export default styles;
}

export { ComponentChildren, ElementChildren };
