import React from "react";

import { render, screen } from "@testing-library/react";

import { EmailSentEmoji } from "@/icons";

describe("Testing EmailSentEmoji icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<EmailSentEmoji testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
