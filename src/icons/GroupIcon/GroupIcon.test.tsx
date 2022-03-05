import React from "react";

import { render, screen } from "@testing-library/react";

import { GroupIcon } from "@/icons";

describe("Testing GroupIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<GroupIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
