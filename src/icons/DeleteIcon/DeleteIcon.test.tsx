import React from "react";

import { render, screen } from "@testing-library/react";

import { DeleteIcon } from "@/icons";

describe("Testing DeleteIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<DeleteIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
