import React from "react";

import { render, screen } from "@testing-library/react";

import { EmailIcon } from "@/icons";

describe("Testing EmailIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<EmailIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
