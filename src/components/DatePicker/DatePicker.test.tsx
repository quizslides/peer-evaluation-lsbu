import React from "react";

import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import { render, screen } from "@testing-library/react";

import { DatePicker } from "@/components";

describe("Testing DatePicker component", () => {
  it("renders a DatePicker with test id", () => {
    const label = "DatePicker";

    const testId = "test-date-picker";

    const onChange = jest.fn();

    render(
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker label={label} value={new Date()} onChange={onChange} testId={testId} />
      </LocalizationProvider>
    );

    const element = screen.getByTestId(testId);

    expect(element).toBeInTheDocument();
  });
});
