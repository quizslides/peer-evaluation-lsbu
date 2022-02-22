import React from "react";

import { render, screen } from "@testing-library/react";

import { HelpButton } from "@/components";

describe("Testing HelpButton component", () => {
  it("renders a help button with test id", () => {
    render(<HelpButton />);

    const buttonElementByTestId = screen.getByTestId("routing-help-page");

    expect(buttonElementByTestId).toBeInTheDocument();
  });
});
