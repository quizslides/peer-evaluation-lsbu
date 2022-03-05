import React from "react";

import { render, screen } from "@testing-library/react";

import { UploadButton } from "@/components";

describe("Testing UploadButton component", () => {
  it("render an UploadButton component by test id", () => {
    render(<UploadButton onFilesSelected={jest.fn()} />);

    const uploadButtonWrapper = screen.getByTestId("upload-button-wrapper");

    const uploadButtonIcon = screen.getByTestId("upload-button-icon");

    expect(uploadButtonWrapper).toBeInTheDocument();
    expect(uploadButtonIcon).toBeInTheDocument();
  });
});
