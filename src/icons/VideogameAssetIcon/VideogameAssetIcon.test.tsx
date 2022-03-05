import React from "react";

import { render, screen } from "@testing-library/react";

import { VideogameAssetIcon } from "@/icons";

describe("Testing VideogameAssetIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<VideogameAssetIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
