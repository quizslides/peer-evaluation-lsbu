import React from "react";

import { render, screen } from "@testing-library/react";

import { AddIcon } from "@/icons";

describe("Testing AddIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<AddIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
