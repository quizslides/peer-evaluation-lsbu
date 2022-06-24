import React from "react";

import { render, screen } from "@testing-library/react";

import { Layout } from "@/containers";

describe("Testing Base component", () => {
  it("renders base with footer and children", () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));

    const textChildrenComponent = "Component Text";

    const ChildrenComponent = () => {
      return <>{textChildrenComponent}</>;
    };

    render(
      <Layout>
        <ChildrenComponent />
      </Layout>
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
