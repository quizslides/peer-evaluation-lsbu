import React from "react";

import { render, screen } from "@testing-library/react";

import { Base } from "@/components";

describe("Testing Base component", () => {
  it("renders base with footer and children", async () => {
    const textChildrenComponent = "Component Text";

    const ChildrenComponent = () => {
      return <>{textChildrenComponent}</>;
    };

    render(
      <Base topLeftComponent="none">
        <ChildrenComponent />
      </Base>
    );

    const childrenComponent = screen.getByText(textChildrenComponent);

    const body = screen.getByTestId("base-body");

    const main = screen.getByTestId("base-main");

    const footer = screen.getByTestId("base-footer");

    expect(childrenComponent).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
