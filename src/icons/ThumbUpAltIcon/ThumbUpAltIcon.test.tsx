import React from "react";

import { render, screen } from "@testing-library/react";

import { ThumbUpAltIcon } from "@/icons";

describe("Testing ThumbUpAltIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<ThumbUpAltIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
