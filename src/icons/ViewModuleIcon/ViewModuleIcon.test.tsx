import React from "react";

import { render, screen } from "@testing-library/react";

import { ViewModuleIcon } from "@/icons";

describe("Testing ViewModuleIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<ViewModuleIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
