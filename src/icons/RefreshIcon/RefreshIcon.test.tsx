import React from "react";

import { render, screen } from "@testing-library/react";

import { RefreshIcon } from "@/icons";

describe("Testing RefreshIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<RefreshIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
