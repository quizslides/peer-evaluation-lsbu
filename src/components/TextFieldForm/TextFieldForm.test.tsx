import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, Formik } from "formik";
import { object, string } from "yup";

import { TextFieldForm } from "@/components";

describe("Testing TextFieldForm component in a form", () => {
  it("renders a TextFieldForm with test id", async () => {
    const initialFormState = {
      email: "",
    };

    const validationSchema = object({
      email: string().email("Invalid email").required("Email required"),
    });

    const fieldName = "email";

    const fieldLabel = "Email";

    const testId = "test-id";

    render(
      <Formik initialValues={initialFormState} validationSchema={validationSchema} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <TextFieldForm
              testId={testId}
              name={fieldName}
              props={{
                fullWidth: true,
                label: fieldLabel,
                type: "email",
                variant: "outlined",
              }}
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    );

    userEvent.type(screen.getByLabelText(/email/i), "test");

    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    const validationErrors = await screen.findByTestId(testId);

    expect(validationErrors).toHaveTextContent("Invalid email");
  });
});
