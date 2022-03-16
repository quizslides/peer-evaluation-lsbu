import React from "react";

import { render, screen } from "@testing-library/react";

import { Error } from "@/components";
import content from "@/content";

describe("Testing Error component", () => {
  it("renders a Error", () => {
    render(<Error />);

    const element = screen.getByText(content.containers.errorContainer.text);

    expect(element).toBeInTheDocument();
  });
});
