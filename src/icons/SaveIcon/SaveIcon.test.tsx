import React from "react";

import { render, screen } from "@testing-library/react";

import { SaveIcon } from "@/icons";

describe("Testing SaveIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<SaveIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
