import React from "react";

import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { ErrorAuth } from "@/containers";
import content from "@/content";

describe("Testing ErrorAuth container", () => {
  it("renders a ErrorAuth", () => {
    render(
      <SessionProvider session={null}>
        <ErrorAuth />
      </SessionProvider>
    );

    const element = screen.getByText(content.containers.errorAuth.text);

    expect(element).toBeInTheDocument();
  });
});
