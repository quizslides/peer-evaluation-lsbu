import React from "react";

import { render, screen } from "@testing-library/react";

import { selectUserScoring } from "@/components";

describe("SelectUserScoring component", () => {
  const value = "test-value";

  const onChange = jest.fn();

  it("renders", () => {
    render(selectUserScoring({ onChange, value }));
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
