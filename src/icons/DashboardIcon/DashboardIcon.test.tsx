import React from "react";

import { render, screen } from "@testing-library/react";

import { DashboardIcon } from "@/icons";

describe("Testing DashboardIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<DashboardIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
