import React from "react";

import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import { render, screen } from "@testing-library/react";
import { Form, Formik } from "formik";
import { date, object } from "yup";

import { DatePickerForm } from "@/components";

describe("Testing MobileDateTimePicker component", () => {
  it("renders a MobileDateTimePicker with test id", () => {
    const initialFormState = {
      date: null,
    };

    const validationSchema = object({
      date: date().required("Date is required").nullable(),
    });

    const fieldName = "date";

    const fieldLabel = "date";

    const testId = "test-id";

    render(
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Formik initialValues={initialFormState} validationSchema={validationSchema} onSubmit={jest.fn()}>
          {() => (
            <Form>
              <DatePickerForm
                testId={testId}
                name={fieldName}
                disablePast
                label={fieldLabel}
                props={{
                  helperText: "helperText",
                  fullWidth: true,
                }}
              />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </LocalizationProvider>
    );

    const element = screen.getByTestId(testId);

    expect(element).toBeInTheDocument();
  });
});
