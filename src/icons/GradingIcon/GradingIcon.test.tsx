import React from "react";

import { render, screen } from "@testing-library/react";

import { GradingIcon } from "@/icons";

describe("Testing GradingIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<GradingIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
