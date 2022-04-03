import React, { memo, useEffect, useState } from "react";

import styled from "@emotion/styled";
import { FormControl, FormHelperText, Grid } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";

import { ConfirmationDialog, DataTable, DataTableAddColumnToolbarIcon, IconButtonWrapper } from "@/components";
import Button from "@/components/Button/Button";
import CreateColumnForm from "@/containers/CreateColumnForm";
import UpdateColumnForm from "@/containers/UpdatePeerEvaluationColumnForm";
import content from "@/content";
import { IColumnFormValue } from "@/forms/PeerEvaluationColumnForm";
import { DeleteIcon, EditIcon } from "@/icons";
import { ArrayObject } from "@/types/object";
import { FieldStatus, IPeerEvaluationColumn, peerEvaluationColumnOrder } from "@/types/peer-evaluation";
import { getMergedKeyValuesObject } from "@/utils/form";

interface IPeerEvaluationColumnManagement {
  helperText: string;
  testId: string;
  name: string;
  isDisabled: boolean;
}

const Wrapper = styled.div`
  margin-top: 2em;
  position: relative;
  margin-bottom: 1em;
`;

const BottomRight = styled.div`
  position: absolute;
  bottom: 100;
  right: 0;
`;

const PeerEvaluationColumnManagement = ({ helperText, testId, name, isDisabled }: IPeerEvaluationColumnManagement) => {
  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);

  const [selectedRows, setSelectedRows] = useState([]);

  const [dataTableColumns, setDataTableColumns] = useState<IPeerEvaluationColumn[]>(meta.value);

  const [isCreatePeerEvaluationColumnOpen, setCreatePeerEvaluationColumnOpen] = useState(false);

  const [isUpdatePeerEvaluationColumnOpen, setUpdatePeerEvaluationColumnOpen] = useState(false);

  const [isDeletePeerEvaluationColumnConfirmationOpen, setDeletePeerEvaluationColumnConfirmationOpen] = useState(false);

  const [deletePeerEvaluationColumn, setDeletePeerEvaluationColumn] = useState<IPeerEvaluationColumn | null>(null);

  const [columns, setColumns] = useState<IPeerEvaluationColumn[]>(field.value);

  const [updateColumn, setUpdateColumn] = useState<IPeerEvaluationColumn | null>(null);

  const resetDefault = () => {
    setColumns(meta.initialValue);
  };

  const onAddColumn = () => {
    setCreatePeerEvaluationColumnOpen(true);
  };

  const onSubmitAddColumn = ({ description }: IColumnFormValue) => {
    const newColumn = {
      id: `column-${Math.random()}`,
      status: FieldStatus.NEW,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setColumns([...columns, newColumn]);
  };

  const onColumnUpdateSelection = (data: ArrayObject) => {
    const dataColumn = getMergedKeyValuesObject(peerEvaluationColumnOrder, data) as unknown as IPeerEvaluationColumn;
    setUpdateColumn(dataColumn);
    setUpdatePeerEvaluationColumnOpen(true);
  };

  const onSubmitUpdateColumn = ({ description }: IColumnFormValue) => {
    const columnsUnchanged = columns.filter(({ id }) => id !== updateColumn?.id);

    const columnToUpdate = columns.filter(({ id }) => id === updateColumn?.id);

    if (columnToUpdate[0].status != FieldStatus.NEW) {
      columnToUpdate[0].status = FieldStatus.UPDATED;
    }

    columnToUpdate[0].description = description;

    setColumns([...columnsUnchanged, ...columnToUpdate]);

    setSelectedRows([]);
  };

  const onColumnDeleteSelection = (data: ArrayObject) => {
    const dataColumn = getMergedKeyValuesObject(peerEvaluationColumnOrder, data) as unknown as IPeerEvaluationColumn;
    setDeletePeerEvaluationColumn(dataColumn);
    setDeletePeerEvaluationColumnConfirmationOpen(true);
  };

  const onDeletePeerEvaluationColumnAccept = () => {
    const columnsUnchanged = columns.filter(({ id }) => id !== deletePeerEvaluationColumn?.id);

    const columnToUpdate = columns.filter(({ id }) => id === deletePeerEvaluationColumn?.id);

    if (columnToUpdate[0].status != FieldStatus.NEW) {
      columnToUpdate[0].status = FieldStatus.DELETED;
      setColumns([...columnsUnchanged, ...columnToUpdate]);
    } else {
      setColumns(columnsUnchanged);
    }

    setSelectedRows([]);

    onDeletePeerEvaluationColumnConfirmationClose();
  };

  const onDeletePeerEvaluationColumnCancel = () => {
    onDeletePeerEvaluationColumnConfirmationClose();
  };

  const onDeletePeerEvaluationColumnConfirmationClose = () => {
    setDeletePeerEvaluationColumn(null);
    setDeletePeerEvaluationColumnConfirmationOpen(false);
  };

  const tableColumns: MUIDataTableColumnDef[] = [
    {
      name: "id",
      label: "ID",
      options: {
        display: "excluded",
        filter: false,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
        filterType: "dropdown",
      },
    },
    {
      name: "createdAt",
      label: "Created",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
        customBodyRender: (date: string) => {
          return new Date(date).toLocaleString("en-GB");
        },
      },
    },
    {
      name: "updatedAt",
      label: "Updated",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
        customBodyRender: (date: string) => {
          return new Date(date).toLocaleString("en-GB");
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        display: "excluded",
        filter: false,
      },
    },
  ];

  const tableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no columns in the peer evaluation",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: isDisabled ? "none" : "single",
    selectableRowsHeader: true,
    rowHover: true,
    download: false,
    draggableColumns: {
      enabled: true,
    },
    filter: false,
    search: false,
    viewColumns: false,
    print: false,
    rowsPerPage: 100,
    customToolbar: (_) =>
      !isDisabled && (
        <DataTableAddColumnToolbarIcon onClick={onAddColumn} testId={"peer-evaluation-column-management-add-column"} />
      ),
    rowsSelected: selectedRows,
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      setSelectedRows(rowsSelected as []);
    },
    customToolbarSelect: (selectedRows, displayData) => (
      <Grid container direction="row" justifyContent="flex-end" alignItems="center">
        <IconButtonWrapper
          testId="peer-evaluation-column-management-update-column"
          tooltip={"Update column"}
          onClick={() => onColumnUpdateSelection(displayData[selectedRows.data[0].index].data)}
        >
          <EditIcon testId={"peer-evaluation-column-management-update-column-button-icon"} />
        </IconButtonWrapper>
        <IconButtonWrapper
          testId="peer-evaluation-column-management-delete-column"
          tooltip={"Delete column"}
          onClick={() => onColumnDeleteSelection(displayData[selectedRows.data[0].index].data)}
        >
          <DeleteIcon testId={"peer-evaluation-column-management-delete-column-button-icon"} />
        </IconButtonWrapper>
      </Grid>
    ),
  };

  useEffect(() => {
    setFieldValue(name, columns);
  }, [columns, name, setFieldValue]);

  useEffect(() => {
    const sanitizeDataTable = () => {
      const data = meta.value as IPeerEvaluationColumn[];

      const dataFilteredByNotDelete = data.filter((item) => item.status !== FieldStatus.DELETED);
      setDataTableColumns(dataFilteredByNotDelete);
    };

    sanitizeDataTable();
  }, [meta.value]);

  const isError = meta.error != undefined;

  return (
    <FormControl error={isError} variant="standard" fullWidth data-testid={testId}>
      <DataTable
        testId={"peer-evaluation-column-management-datatable"}
        isVisible
        title={"Columns"}
        data={dataTableColumns}
        columns={tableColumns}
        options={tableOptions}
      />

      <FormHelperText>{isError ? meta.error : helperText}</FormHelperText>

      <Wrapper>
        <BottomRight>
          <Button
            size="small"
            disabled={isDisabled}
            onClick={resetDefault}
            testId={`${testId}-reset-button`}
            variant={"outlined"}
          >
            {content.containers.peerEvaluationColumnManagement.resetButton}
          </Button>
        </BottomRight>
      </Wrapper>

      <CreateColumnForm
        state={isCreatePeerEvaluationColumnOpen}
        updateFormState={setCreatePeerEvaluationColumnOpen}
        onSubmit={onSubmitAddColumn}
      />

      {updateColumn && (
        <UpdateColumnForm
          state={isUpdatePeerEvaluationColumnOpen}
          updateFormState={setUpdatePeerEvaluationColumnOpen}
          onSubmit={onSubmitUpdateColumn}
          description={updateColumn.description}
        />
      )}

      <ConfirmationDialog
        testId={"peer-evaluation-column-management-confirmation-delete-column"}
        isOpen={isDeletePeerEvaluationColumnConfirmationOpen}
        title={content.containers.peerEvaluationColumnManagement.confirmationDeleteColumn.title}
        textContent={content.containers.peerEvaluationColumnManagement.confirmationDeleteColumn.bodyText}
        onAccept={onDeletePeerEvaluationColumnAccept}
        onClose={onDeletePeerEvaluationColumnCancel}
        closeText={content.containers.peerEvaluationColumnManagement.confirmationDeleteColumn.closeText}
        acceptText={content.containers.peerEvaluationColumnManagement.confirmationDeleteColumn.acceptText}
      />
    </FormControl>
  );
};

export default memo(PeerEvaluationColumnManagement);
