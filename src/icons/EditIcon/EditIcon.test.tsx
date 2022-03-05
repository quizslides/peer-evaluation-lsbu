import React from "react";

import { render, screen } from "@testing-library/react";

import { EditIcon } from "@/icons";

describe("Testing EditIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<EditIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
