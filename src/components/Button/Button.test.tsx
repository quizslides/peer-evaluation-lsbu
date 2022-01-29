import React from "react";

import { render, screen } from "@testing-library/react";

import Button from "@/components/Button/Button";

describe("Testing button component", () => {
  it("renders a button with variant text", () => {
    const buttonText = "Text Button";

    render(<Button variant="text">{buttonText}</Button>);

    const button = screen.getByText(buttonText);

    expect(button).toBeInTheDocument();
  });

  it("renders a button with variant outlined", () => {
    const buttonText = "Text Button";

    render(<Button variant="outlined">{buttonText}</Button>);

    const button = screen.getByText(buttonText);

    expect(button).toBeInTheDocument();
  });

  it("renders a button with variant contained", () => {
    const buttonText = "Text Button";

    render(<Button variant="contained">{buttonText}</Button>);

    const button = screen.getByText(buttonText);

    expect(button).toBeInTheDocument();
  });
});
