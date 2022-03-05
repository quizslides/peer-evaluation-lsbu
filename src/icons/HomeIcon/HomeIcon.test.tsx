import React from "react";

import { render, screen } from "@testing-library/react";

import { HomeIcon } from "@/icons";

describe("Testing HomeIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<HomeIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
