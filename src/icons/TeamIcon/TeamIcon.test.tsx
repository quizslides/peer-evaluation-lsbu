import React from "react";

import { render, screen } from "@testing-library/react";

import { TeamIcon } from "@/icons";

describe("Testing TeamIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<TeamIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
