import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextField } from "@/components";

describe("Testing TextField component in a form", () => {
  it("renders a TextField with test id", async () => {
    const fieldLabel = "text";

    const testId = "test-id";

    render(
      <TextField
        testId={testId}
        props={{
          fullWidth: true,
          label: fieldLabel,
          type: "email",
          variant: "outlined",
        }}
      />
    );

    await userEvent.type(screen.getByLabelText(/text/i), "test");

    const validationErrors = await screen.findByTestId(testId);

    expect(validationErrors).toBeInTheDocument();
  });
});
