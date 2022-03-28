import React from "react";

import { render, screen } from "@testing-library/react";

import { Error404 } from "@/containers";
import content from "@/content";

describe("Testing Error404 container", () => {
  it("renders a Error404", () => {
    render(<Error404 />);

    const element = screen.getByText(content.containers[404].text);

    expect(element).toBeInTheDocument();
  });
});
