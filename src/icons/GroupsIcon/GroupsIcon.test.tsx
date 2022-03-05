import React from "react";

import { render, screen } from "@testing-library/react";

import { GroupsIcon } from "@/icons";

describe("Testing GroupIcon icon", () => {
  it("renders a icon with test id", () => {
    const testId = "test-icon";

    render(<GroupsIcon testId={testId} />);

    const iconElementByTestId = screen.getByTestId(testId);

    expect(iconElementByTestId).toBeInTheDocument();
  });
});
