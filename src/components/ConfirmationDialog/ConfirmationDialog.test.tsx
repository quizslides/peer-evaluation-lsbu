import React from "react";

import { render, screen } from "@testing-library/react";

import { ConfirmationDialog } from "@/components";

describe("Testing ConfirmationDialog component", () => {
  it("A ConfirmationDialog with text is available when isOpen is true", () => {
    const testId = "test-button";

    render(
      <ConfirmationDialog
        testId={testId}
        isOpen={true}
        title={"Test Confirmation Dialog"}
        textContent={"Test"}
        onClose={jest.fn()}
        onAccept={jest.fn()}
        closeText={"Close"}
        acceptText={"Accept"}
      />
    );

    const element = screen.getByTestId(testId);

    expect(element).toBeInTheDocument();
  });

  it("A ConfirmationDialog with text is not visible when isOpen is false", () => {
    const testId = "test-button";

    const bodyText = "Test Confirmation Dialog";

    render(
      <ConfirmationDialog
        testId={testId}
        isOpen={false}
        title={bodyText}
        textContent={"Test"}
        onClose={jest.fn()}
        onAccept={jest.fn()}
        closeText={"Close"}
        acceptText={"Accept"}
      />
    );

    const elements = screen.queryByText(bodyText);

    expect(elements).not.toBeInTheDocument();
  });
});
