import React from "react";

import { render, screen } from "@testing-library/react";

import { Typography } from "@/components";

describe("Testing Typography component", () => {
  it("renders a text", () => {
    const text = "Text";

    const testId = "test-typography";

    render(<Typography testId={testId}>{text}</Typography>);

    const element = screen.getByText(text);

    const elementByTestId = screen.getByTestId(testId);

    expect(element).toBeInTheDocument();
    expect(elementByTestId).toBeInTheDocument();
  });

  it("renders text with H1 variant", () => {
    const text = "Text";

    const testId = "test-typography";

    render(
      <Typography variant="h1" testId={testId}>
        {text}
      </Typography>
    );

    const element = screen.getByText(text);

    const elementByTestId = screen.getByTestId(testId);

    expect(element).toHaveClass("MuiTypography-h1");
    expect(element).toBeInTheDocument();
    expect(elementByTestId).toBeInTheDocument();
  });
});
