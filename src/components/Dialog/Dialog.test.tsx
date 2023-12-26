import React from "react";

import { render, screen } from "@testing-library/react";

import { Dialog, Typography } from "@/components";

describe("Testing Dialog component", () => {
  it.skip("renders a Dialog and visible", () => {
    const title = "Title test";

    const testId = "test-id";

    const testIdChildComponent = "test-confirmation-dialog-child-component";

    const contentChildComponent = "ChildComponent";

    const onAccept = jest.fn();

    const onCancel = jest.fn();

    const isDialogOpen = true;

    render(
      <Dialog
        testId={testId}
        title={title}
        content={<Typography testId={testIdChildComponent}>{contentChildComponent}</Typography>}
        rightButton="Yes"
        leftButton="Cancel"
        maxWidth="xs"
        onClickRightButton={onAccept}
        onClickLeftButton={onCancel}
        open={isDialogOpen}
      />
    );

    const dialog = screen.queryByTestId(testId);

    const childComponent = screen.queryByTestId(testIdChildComponent);

    expect(dialog).toBeInTheDocument();
    expect(childComponent).toBeInTheDocument();
  });

  it.skip("renders a Dialog and hidden", () => {
    const title = "Title test";

    const testId = "test-id";

    const testIdChildComponent = "test-confirmation-dialog-child-component";

    const contentChildComponent = "ChildComponent";

    const onAccept = jest.fn();

    const onCancel = jest.fn();

    const isDialogOpen = false;

    render(
      <Dialog
        testId={testId}
        title={title}
        content={<Typography testId={testIdChildComponent}>{contentChildComponent}</Typography>}
        rightButton="Yes"
        leftButton="Cancel"
        maxWidth="xs"
        onClickRightButton={onAccept}
        onClickLeftButton={onCancel}
        open={isDialogOpen}
      />
    );

    const dialog = screen.queryByTestId(testId);

    const childComponent = screen.queryByTestId(testIdChildComponent);

    expect(dialog).not.toBeInTheDocument();
    expect(childComponent).not.toBeInTheDocument();
  });
});
