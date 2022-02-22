import React from "react";

import { render, screen } from "@testing-library/react";

import { HappyFaceEmoji } from "@/icons";

describe("Testing HappyFaceEmoji icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<HappyFaceEmoji testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
