import React from "react";

import { render, screen } from "@testing-library/react";

import { LoginIcon } from "@/icons";

describe("Testing LoginIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<LoginIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
