import React from "react";

import { render, screen } from "@testing-library/react";

import { Divider } from "@/components";

describe("Testing Divider component", () => {
  it("renders a Divider", () => {
    const text = "Divider Text";

    render(<Divider>{text}</Divider>);

    const element = screen.getByText(text);

    expect(element).toBeInTheDocument();
  });
});
