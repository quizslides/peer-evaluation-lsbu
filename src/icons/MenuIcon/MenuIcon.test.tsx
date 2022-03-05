import React from "react";

import { render, screen } from "@testing-library/react";

import { MenuIcon } from "@/icons";

describe("Testing MenuIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<MenuIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
