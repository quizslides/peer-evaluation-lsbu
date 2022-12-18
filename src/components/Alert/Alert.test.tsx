import React from "react";

import { render, screen } from "@testing-library/react";

import { Alert } from "@/components";
import content from "@/content";

const testId = "test";

const testIdBase = content.components.alert.testId;

const testIdComponent = `${testId}-${testIdBase}`;

describe("Testing Alert component", () => {
  it("Renders an alert visible", () => {
    const text = "Text";

    render(<Alert testId={testId}>{text}</Alert>);

    const buttonElement = screen.getByText(text);

    const buttonElementByTestId = screen.getByTestId(testIdComponent);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElementByTestId).toBeInTheDocument();
  });

  it("Renders an alert hidden", () => {
    const text = "Text";

    render(
      <Alert testId={testId} isVisible={false}>
        {text}
      </Alert>
    );

    const elements = screen.queryByText(text);

    expect(elements).not.toBeInTheDocument();
  });
});
