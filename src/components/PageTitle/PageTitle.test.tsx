import React from "react";

import { render, screen } from "@testing-library/react";

import { PageTitle } from "@/components";

describe("Testing PageTitle component", () => {
  it("renders a PageTitle with H1 variant", () => {
    const text = "Text";

    const testId = "test-id";

    const variant = "h1";

    render(<PageTitle title={text} testId={testId} variant={variant} />);

    const element = screen.getByText(text);

    const typographyByTestId = screen.getByTestId(testId);

    expect(element).toBeInTheDocument();

    expect(typographyByTestId).toHaveClass(`MuiTypography-${variant}`);
    expect(typographyByTestId).toBeInTheDocument();
  });

  it("renders a PageTitle with H2 variant", () => {
    const text = "Text";

    const testId = "test-id";

    const variant = "h2";

    render(<PageTitle title={text} testId={testId} variant={variant} />);

    const element = screen.getByText(text);

    const typographyByTestId = screen.getByTestId(testId);

    expect(element).toBeInTheDocument();

    expect(typographyByTestId).toHaveClass(`MuiTypography-${variant}`);
    expect(typographyByTestId).toBeInTheDocument();
  });
});
