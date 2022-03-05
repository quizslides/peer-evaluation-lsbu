import React from "react";

import { render, screen } from "@testing-library/react";

import { CloseIcon } from "@/icons";

describe("Testing CloseIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<CloseIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
