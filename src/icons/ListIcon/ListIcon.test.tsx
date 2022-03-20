import React from "react";

import { render, screen } from "@testing-library/react";

import { ListIcon } from "@/icons";

describe("Testing ListIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<ListIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
