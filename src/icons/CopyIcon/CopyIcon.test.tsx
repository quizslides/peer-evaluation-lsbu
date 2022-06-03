import React from "react";

import { render, screen } from "@testing-library/react";

import { CopyIcon } from "@/icons";

describe("Testing CopyIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<CopyIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
