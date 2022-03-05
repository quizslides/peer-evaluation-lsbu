import React from "react";

import { render, screen } from "@testing-library/react";

import { LogoutIcon } from "@/icons";

describe("Testing LogoutIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<LogoutIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
