import React from "react";

import { render, screen } from "@testing-library/react";

import { VirtualStringList } from "@/components";

describe("Testing VirtualStringList component", () => {
  it("render an VirtualStringList component by test id", () => {
    const testId = "test-virtual-string-list-component";

    const data = ["list-data-1", "list-data-2", "list-data-3", "list-data-4"];

    render(<VirtualStringList testId={testId} data={data} height={200} maxWidth={50} itemSize={25} />);

    const element = screen.getByTestId(testId);

    const itemList = screen.getByText(data[0]);

    expect(element).toBeInTheDocument();
    expect(itemList).toBeInTheDocument();
  });
});
