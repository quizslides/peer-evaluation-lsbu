import React from "react";

import { render, screen } from "@testing-library/react";

import Button from "@/components/Button/Button";

describe("Adding test as initial starting point", () => {
  it("renders a heading", () => {
    const buttonText = "Text Button";

    render(<Button variant="text">{buttonText}</Button>);

    const button = screen.getByText(buttonText);

    expect(button).toBeInTheDocument();
  });
});
