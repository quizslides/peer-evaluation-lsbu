import React from "react";

import { render, screen } from "@testing-library/react";

import { People } from "@/icons";

describe("Testing People icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<People testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
