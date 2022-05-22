import React from "react";

import { Form, Formik } from "formik";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";
import { array, object, string } from "yup";

import { DataTable, TextFieldFormDataTable } from "@/components";
import { FieldWrapper } from "@/forms/style";
import { RoleScope } from "@/utils";
import { ObjectArray, objectToArrayOfObject } from "@/utils/form";

const TestPage: NextPage = () => {
  const validationSchema = object({
    texts: array().of(
      object().shape({
        text: string().email("Invalid email").required("Email required"),
      })
    ),
  });

  const dataTableColumns: MUIDataTableColumnDef[] = [
    {
      name: "text",
      label: "Text",
      options: {
        display: true,
        customBodyRender: (_, tableMeta, updateValue) => (
          <FieldWrapper marginBottom="1em">
            <TextFieldFormDataTable
              updateDataTableFormValue={updateValue}
              validationSchema={validationSchema}
              validationFieldPath={"texts.text"}
              testId="text-test-id"
              name={`texts[${tableMeta.rowIndex}].text`}
              props={{
                name: `texts[${tableMeta.rowIndex}].text`,
                required: true,
                fullWidth: true,
                label: "Label",
                type: "email",
                variant: "outlined",
                placeholder: "Placeholder",
              }}
            />
          </FieldWrapper>
        ),
      },
    },
    {
      name: "test",
      label: "Test",
    },
  ];

  const dataTableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no text",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "single",
    selectableRowsHeader: true,
    rowHover: true,
    download: true,
    filter: true,
    search: true,
    viewColumns: true,
    pagination: false,
    print: false,
    enableNestedDataAccess: ".",
    downloadOptions: {
      filename: `peer_evaluations_students-${new Date().getTime()}.csv`,
    },
    draggableColumns: {
      enabled: true,
    },
    rowsPerPage: 100,
  };

  const data = [
    {
      text: "1",
      test: "test1",
    },
    {
      text: "2",
      test: "test2",
    },
  ];

  return (
    <div>
      <Formik
        initialValues={{
          texts: objectToArrayOfObject("text", data as unknown as ObjectArray),
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <Form>
            <DataTable
              testId={"test-datatable"}
              data={data}
              columns={dataTableColumns}
              options={dataTableOptions}
              isVisible={true}
            />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
};

export default TestPage;
