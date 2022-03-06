import React from "react";

import { render, screen } from "@testing-library/react";

import { LoaderSpinner, Typography } from "@/components";

describe("Testing LoaderSpinner component", () => {
  it("renders a LoaderSpinner with active loading state", () => {
    const text = "Text";

    const testId = "test-id";

    render(
      <LoaderSpinner isLoading>
        <Typography testId={testId}>{text}</Typography>
      </LoaderSpinner>
    );

    const elements = screen.queryByText(text);
    expect(elements).not.toBeInTheDocument();
  });

  it("renders a LoaderSpinner with finished loading state", () => {
    const text = "Text";

    const testId = "test-id";

    render(
      <LoaderSpinner isLoading={false}>
        <Typography testId={testId}>{text}</Typography>
      </LoaderSpinner>
    );

    const element = screen.getByText(text);

    const typographyByTestId = screen.getByTestId(testId);

    expect(element).toBeInTheDocument();

    expect(typographyByTestId).toBeInTheDocument();
  });
});
