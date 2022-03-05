import React from "react";

import { render, screen } from "@testing-library/react";

import { BackArrowButton } from "@/components";

describe("Testing BackArrowButton component", () => {
  it("renders a back arrow button with test id", () => {
    render(<BackArrowButton />);

    const buttonElementByTestId = screen.getByTestId("goback-arrow-button");

    expect(buttonElementByTestId).toBeInTheDocument();
  });
});
