import React from "react";

import { render, screen } from "@testing-library/react";

import { HelpOutlineIcon } from "@/icons";

describe("Testing HelpOutlineIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<HelpOutlineIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
