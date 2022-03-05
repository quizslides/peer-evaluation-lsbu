import React from "react";

import { render, screen } from "@testing-library/react";

import { WidgetsIcon } from "@/icons";

describe("Testing Widgets icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<WidgetsIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
