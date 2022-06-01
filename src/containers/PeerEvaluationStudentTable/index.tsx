import React, { memo, useEffect, useState } from "react";

import { PeerEvaluationStudentReview } from "@generated/type-graphql";
import { Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { useSession } from "next-auth/react";
import { array, number, object, string } from "yup";
import { OptionalObjectSchema } from "yup/lib/object";
import { AnyObject } from "yup/lib/types";

import LoadingContainer from "../LoadingContainer";

import {
  Button,
  CriteriaScoreTotalFormDataTable,
  DataTable,
  SelectFieldFormDataTable,
  TextFieldFormDataTable,
} from "@/components";
import { FieldWrapper } from "@/forms/style";
import { VisibilityOffIcon } from "@/icons";
import { PeerEvaluationTableStudentResponse } from "@/pages/api/resolvers/peer-evaluation-table-student-query";
import { CenteredContent } from "@/styles";
import { ObjectArray, getRangeNumberObject, objectToArrayOfObject } from "@/utils/form";

const testId = "container-peer-evaluation-student-table";

interface IPeerEvaluationStudentTable {
  data: PeerEvaluationTableStudentResponse;
  onSubmit: (data: IPeerEvaluationStudentTableForm[]) => void;
}

interface IPeerEvaluationStudentData {
  [key: string]: number | string | undefined | { [key: string]: string | number | undefined };
}

interface IPeerEvaluationStudentTableForm {
  [x: string]: {
    [x: string]: object;
  }[];
}

const PeerEvaluationStudentTable = ({ data, onSubmit }: IPeerEvaluationStudentTable) => {
  const { data: session } = useSession();

  const [dataTableColumns, setDataTableColumns] = useState<MUIDataTableColumn[]>([]);

  const [validationSchemaState, setValidationSchemaState] = useState<OptionalObjectSchema<AnyObject> | null>(null);

  const [peerEvaluationTableData, setPeerEvaluationTableData] = useState<IPeerEvaluationStudentData[]>([]);

  const [peerEvaluationTableFormInitialState, setPeerEvaluationTableFormInitialState] = useState<
    IPeerEvaluationStudentTableForm[]
  >([]);

  const isReadOnly = data.readOnly;

  const tableOptions: MUIDataTableOptions = {
    responsive: "standard",
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
    selectableRowsHeader: false,
    rowHover: true,
    download: false,
    print: false,
    pagination: false,
    filter: false,
    search: false,
    viewColumns: false,
    sort: false,
    customToolbar: (_) => (
      <Button testId="" variant="contained" type="submit">
        SAVE
      </Button>
    ),
  };

  useEffect(() => {
    const criteriaScoreRangeMin = data.peerEvaluation?.criteriaScoreRangeMin || 0;

    const criteriaScoreRangeMax = data.peerEvaluation?.criteriaScoreRangeMax || 0;

    const rangeSelectField = getRangeNumberObject(criteriaScoreRangeMax, criteriaScoreRangeMin);

    const columnsReviewer = data.peerEvaluation?.columns?.map((column) => column.id) as string[];

    const columnsReviewerValidation = columnsReviewer.map((columnReviewer) => ({
      [`${columnReviewer}s`]: array().of(
        object().shape({
          [columnReviewer]: object().shape({
            criteriaScore: number()
              .typeError("Only numbers allowed")
              .required("Criteria score required")
              .min(criteriaScoreRangeMin, "Value not allowed")
              .max(criteriaScoreRangeMax, "Value not allowed"),
          }),
        })
      ),
    })) as [{}];

    const validationSchema = object({
      criteriaScoreTotals: array().of(
        object().shape({
          criteriaScoreTotal: number().required("criteriaScoreTotal is required"),
        })
      ),
      comments: array().of(
        object().shape({
          comment: string().required("comment is required"),
        })
      ),
      ...Object.assign(...columnsReviewerValidation),
    });

    setValidationSchemaState(validationSchema);

    const columnsDataTableBase: MUIDataTableColumn[] = [
      {
        name: "peerEvaluationStudentId",
        label: "peerEvaluationStudentId",
        options: {
          display: "excluded",
        },
      },
      {
        name: "peerEvaluationRevieweeId",
        label: "peerEvaluationRevieweeId",
        options: {
          display: "excluded",
        },
      },
      {
        name: "studentEmail",
        label: "Student Email",
        options: {
          display: "excluded",
        },
      },
      {
        name: "studentName",
        label: "Student Name",
        options: {
          customBodyRender: (value) => (
            <FieldWrapper marginBottom="3em">{`${value} ${
              session?.user.name === value ? "(Myself)" : ""
            }`}</FieldWrapper>
          ),
        },
      },
      {
        name: "criteriaScoreTotal",
        label: "Total",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const { rowIndex, currentTableData } = tableMeta;

            const currentData = currentTableData[rowIndex] as unknown as {
              data: object[] | string[] | number[] | { [key: string]: [] }[];
            };

            const currentCriteriaScoreRows = currentData.data.slice(4, currentData.data.length - 2);

            let criteriaScoreRow = 0;

            for (const row of currentCriteriaScoreRows) {
              if (typeof row === "object") {
                const rowData = row as { [key: string]: number };
                criteriaScoreRow = criteriaScoreRow + Number(rowData.criteriaScore);
              } else {
                criteriaScoreRow = criteriaScoreRow + Number(row);
              }
            }

            return (
              <CriteriaScoreTotalFormDataTable
                name={`criteriaScoreTotals[${tableMeta.rowIndex}].criteriaScoreTotal`}
                testId={""}
                initialValue={value}
                updatedValue={criteriaScoreRow.toString()}
                updateDataTableFormValue={updateValue}
              />
            );
          },
        },
      },
      {
        name: "comment",
        label: "Comment",
        options: {
          display: true,
          customBodyRender: (_, tableMeta, updateValue) => (
            <FieldWrapper marginBottom="3em">
              <TextFieldFormDataTable
                updateDataTableFormValue={updateValue}
                validationSchema={validationSchema}
                validationFieldPath={"comments.comment"}
                testId=""
                name={`comments[${tableMeta.rowIndex}].comment`}
                props={{
                  name: `comments[${tableMeta.rowIndex}].comment`,
                  required: true,
                  fullWidth: true,
                  label: "Comment",
                  type: "text",
                  variant: "outlined",
                  disabled: isReadOnly,
                }}
              />
            </FieldWrapper>
          ),
        },
      },
    ];

    if (data.peerEvaluation?.columns) {
      const columnsPeerEvaluation = data.peerEvaluation?.columns?.map(
        (column): MUIDataTableColumn => ({
          name: column.id,
          label: column.description,
          options: {
            customBodyRender: (_, tableMeta, updateValue) => (
              <FieldWrapper marginBottom="3em">
                <SelectFieldFormDataTable
                  name={`${column.id}s[${tableMeta.rowIndex}].${column.id}.criteriaScore`}
                  options={rangeSelectField}
                  props={{
                    name: `${column.id}s[${tableMeta.rowIndex}].${column.id}.criteriaScore`,
                    required: true,
                    label: "Criteria Score",
                    fullWidth: true,
                    disabled: isReadOnly,
                  }}
                  testId=""
                  updateDataTableFormValue={updateValue}
                  validationSchema={validationSchema}
                  validationFieldPath={`${column.id}s.${column.id}.criteriaScore`}
                />
              </FieldWrapper>
            ),
          },
        })
      );

      const columns = [
        columnsDataTableBase[0],
        columnsDataTableBase[1],
        columnsDataTableBase[2],
        columnsDataTableBase[3],
        ...columnsPeerEvaluation,
        columnsDataTableBase[4],
        columnsDataTableBase[5],
      ];

      setDataTableColumns(columns);
    }
  }, [data.peerEvaluation, isReadOnly]);

  useEffect(() => {
    const getSanitizedPeerEvaluationStudentTableOnFetch = (
      data: PeerEvaluationStudentReview
    ): IPeerEvaluationStudentData[] => {
      const peerEvaluationStudentId = data.peerEvaluationStudentId;

      const sanitized = data.PeerEvaluationReviewees?.map((peerEvaluationReviewee) => {
        const peerEvaluationRevieweesColumns = peerEvaluationReviewee.PeerEvaluationRevieweeColumn?.map((column) => ({
          [column.peerEvaluationColumnId]: {
            peerEvaluationRevieweeColumnId: column.id,
            columnId: column.peerEvaluationColumnId,
            criteriaScore: column.criteriaScore,
          },
        })) as [{}];

        return {
          studentName: peerEvaluationReviewee.studentReviewed?.user?.name,
          studentEmail: peerEvaluationReviewee.studentReviewed?.user?.email,
          peerEvaluationStudentId: peerEvaluationStudentId,
          comment: peerEvaluationReviewee.comment,
          criteriaScoreTotal: peerEvaluationReviewee.criteriaScoreTotal,
          peerEvaluationRevieweeId: peerEvaluationReviewee.id,
          ...Object.assign(...peerEvaluationRevieweesColumns),
        };
      }) as IPeerEvaluationStudentData[];

      return sanitized;
    };

    if (data.peerEvaluationStudentReview) {
      const sanitizedPeerEvaluationStudentTableOnFetch = getSanitizedPeerEvaluationStudentTableOnFetch(
        data.peerEvaluationStudentReview
      );

      setPeerEvaluationTableData(sanitizedPeerEvaluationStudentTableOnFetch);
    }
  }, [data.peerEvaluationStudentReview]);

  useEffect(() => {
    if (dataTableColumns.length && peerEvaluationTableData.length) {
      const columnsName = dataTableColumns.map((column) => column.name);

      const initialValues = Object.assign(
        {},
        ...columnsName.map((columnName) => ({
          [`${columnName}s`]: objectToArrayOfObject(columnName, peerEvaluationTableData as unknown as ObjectArray),
        }))
      );

      setPeerEvaluationTableFormInitialState(initialValues);
    }
  }, [dataTableColumns, peerEvaluationTableData]);

  if (!data.visible) {
    return (
      <CenteredContent>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <VisibilityOffIcon testId={`${testId}-visibility-off-icon`} fontSize="large" />
        </Stack>
      </CenteredContent>
    );
  }

  if (peerEvaluationTableFormInitialState.length === 0 || !validationSchemaState) {
    return <LoadingContainer loading />;
  }

  return (
    <Formik
      initialValues={peerEvaluationTableFormInitialState}
      validationSchema={validationSchemaState}
      onSubmit={(data) => onSubmit(data)}
    >
      {() => (
        <Form>
          <DataTable
            testId={`${testId}-datatable`}
            isVisible
            data={peerEvaluationTableData}
            columns={dataTableColumns}
            options={tableOptions}
          />
        </Form>
      )}
    </Formik>
  );
};

export type { IPeerEvaluationStudentTableForm };

export default memo(PeerEvaluationStudentTable);
