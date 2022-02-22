import React from "react";

import { render, screen } from "@testing-library/react";

import { UploadIcon } from "@/icons";

describe("Testing UploadIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<UploadIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
