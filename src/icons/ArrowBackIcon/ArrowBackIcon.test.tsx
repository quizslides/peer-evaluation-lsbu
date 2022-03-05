import React from "react";

import { render, screen } from "@testing-library/react";

import { ArrowBackIcon } from "@/icons";

describe("Testing ArrowBackIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<ArrowBackIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
