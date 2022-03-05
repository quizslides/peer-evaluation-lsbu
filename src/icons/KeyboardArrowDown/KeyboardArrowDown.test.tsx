import React from "react";

import { render, screen } from "@testing-library/react";

import { KeyboardArrowDown } from "@/icons";

describe("Testing KeyboardArrowDown icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<KeyboardArrowDown testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
