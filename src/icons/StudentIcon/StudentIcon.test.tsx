import React from "react";

import { render, screen } from "@testing-library/react";

import { StudentIcon } from "@/icons";

describe("Testing StudentIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<StudentIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
