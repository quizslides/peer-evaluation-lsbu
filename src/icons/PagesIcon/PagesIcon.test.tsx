import React from "react";

import { render, screen } from "@testing-library/react";

import { PagesIcon } from "@/icons";

describe("Testing PagesIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<PagesIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
