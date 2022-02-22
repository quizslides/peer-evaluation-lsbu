import React from "react";

import { render, screen } from "@testing-library/react";

import { SadFaceEmoji } from "@/icons";

describe("Testing SadFaceEmoji icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<SadFaceEmoji testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
