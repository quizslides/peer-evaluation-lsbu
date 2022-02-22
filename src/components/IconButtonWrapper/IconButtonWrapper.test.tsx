import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import { IconButtonWrapper } from "@/components";

describe("Testing IconButtonWrapper component", () => {
  it("renders a IconButtonWrapper with tooltip by test id", async () => {
    const testId = "test-id";

    const tooltip = "icon-button-wrapper";

    render(<IconButtonWrapper testId={testId} tooltip={tooltip} />);

    const buttonElementByTestId = screen.getByTestId(testId);

    fireEvent.mouseEnter(buttonElementByTestId);

    expect(buttonElementByTestId).toBeInTheDocument();

    await screen.findByText(tooltip);

    expect(screen.getByText(tooltip)).toBeInTheDocument();
  });

  it("renders a IconButtonWrapper without tooltip by test id", () => {
    const testId = "test-id";

    render(<IconButtonWrapper testId={testId} />);

    const buttonElementByTestId = screen.getByTestId(testId);

    expect(buttonElementByTestId).toBeInTheDocument();
  });
});
