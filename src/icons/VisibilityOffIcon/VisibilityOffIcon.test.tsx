import React from "react";

import { render, screen } from "@testing-library/react";

import { VisibilityOffIcon } from "@/icons";

describe("Testing VisibilityOffIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<VisibilityOffIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
