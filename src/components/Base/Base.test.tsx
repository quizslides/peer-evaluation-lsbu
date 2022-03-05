import React from "react";

import { render, screen } from "@testing-library/react";

import { Base } from "@/components";

describe("Testing Base component", () => {
  it("renders base with error state", () => {
    const textChildrenComponent = "Component Text";

    const ChildrenComponent = () => {
      return <>{textChildrenComponent}</>;
    };

    render(
      <Base topLeftComponent="none" error loading={false}>
        <ChildrenComponent />
      </Base>
    );

    const elements = screen.queryByText(textChildrenComponent);
    expect(elements).not.toBeInTheDocument();

    const errorComponent = screen.getByTestId("error-container-text");
    expect(errorComponent).toBeInTheDocument();
  });

  it("renders base with loading state", () => {
    const textChildrenComponent = "Component Text";

    const ChildrenComponent = () => {
      return <>{textChildrenComponent}</>;
    };

    render(
      <Base topLeftComponent="none" error={false} loading>
        <ChildrenComponent />
      </Base>
    );

    const elements = screen.queryByText(textChildrenComponent);
    expect(elements).not.toBeInTheDocument();

    const errorComponent = screen.getByTestId("loader-spinner");
    expect(errorComponent).toBeInTheDocument();
  });

  it("renders base returning the children component", () => {
    const textChildrenComponent = "Component Text";

    const ChildrenComponent = () => {
      return <>{textChildrenComponent}</>;
    };

    render(
      <Base topLeftComponent="none" error={false} loading={false}>
        <ChildrenComponent />
      </Base>
    );

    const elements = screen.queryByText(textChildrenComponent);
    expect(elements).toBeInTheDocument();
  });
});
