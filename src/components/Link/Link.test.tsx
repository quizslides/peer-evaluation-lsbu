import React from "react";

import { render, screen } from "@testing-library/react";

import { Link, Typography } from "@/components";

describe("Testing Link component", () => {
  it("renders a link with href defined", () => {
    const text = "Text";

    const testId = "test-link";

    const href = "http://localhost";

    render(
      <Link color="inherit" underline="none" href={href} testId={testId}>
        {text}
      </Link>
    );

    const element = screen.getByText(text);

    const elementByTestId = screen.getByTestId(testId);

    expect(element).toBeInTheDocument();
    expect(elementByTestId).toBeInTheDocument();
    expect(element.getAttribute("href")).toEqual(href);
  });

  it("renders a Link with href defined with a child component as typography", () => {
    const text = "Text";

    const testIdLink = "test-link";

    const testIdTypography = "test-typography";

    const href = "http://example";

    render(
      <Link color="inherit" underline="none" href={href} testId={testIdLink}>
        <Typography variant="h1" testId={testIdTypography}>
          {text}
        </Typography>
      </Link>
    );

    const element = screen.getByText(text);

    const linkByTestId = screen.getByTestId(testIdLink);

    const typographyByTestId = screen.getByTestId(testIdTypography);

    expect(element).toBeInTheDocument();
    expect(linkByTestId).toBeInTheDocument();
    expect(linkByTestId.getAttribute("href")).toEqual(href);
    expect(typographyByTestId).toHaveClass("MuiTypography-h1");
    expect(typographyByTestId).toBeInTheDocument();
  });
});
