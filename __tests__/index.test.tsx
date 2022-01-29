import React from "react";

import { render, screen } from "@testing-library/react";

import Home from "@/pages/index";

describe("Adding test as initial starting point", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
