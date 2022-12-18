import React from "react";

import { render, screen } from "@testing-library/react";

import { Button } from "@/components";

const testId = "test";

const testIdBase = "-button";

const testIdComponent = `${testId}${testIdBase}`;

describe("Testing Button component", () => {
  it("renders a button with variant text", () => {
    const buttonText = "Text Button";

    render(
      <Button testId={testId} variant="text">
        {buttonText}
      </Button>
    );

    const buttonElement = screen.getByText(buttonText);

    const buttonElementByTestId = screen.getByTestId(testIdComponent);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElementByTestId).toBeInTheDocument();
  });

  it("renders a button with variant outlined", () => {
    const buttonText = "Text Button";

    render(
      <Button testId={testId} variant="outlined">
        {buttonText}
      </Button>
    );

    const buttonElement = screen.getByText(buttonText);

    const buttonElementByTestId = screen.getByTestId(testIdComponent);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElementByTestId).toBeInTheDocument();
  });

  it("renders a button with variant contained", () => {
    const buttonText = "Text Button";

    render(
      <Button testId={testId} variant="contained">
        {buttonText}
      </Button>
    );

    const buttonElement = screen.getByText(buttonText);

    const buttonElementByTestId = screen.getByTestId(testIdComponent);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElementByTestId).toBeInTheDocument();
  });
});
