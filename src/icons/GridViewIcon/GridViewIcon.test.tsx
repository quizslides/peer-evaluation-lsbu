import React from "react";

import { render, screen } from "@testing-library/react";

import { GridViewIcon } from "@/icons";

describe("Testing GridViewIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<GridViewIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
