import React, { memo, useEffect, useState } from "react";

import styled from "@emotion/styled";
import { FormControl, FormHelperText } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";

import DataTableEditDeleteToolbar from "../DataTableEditDeleteToolbar";

import { ConfirmationDialog, DataTable, DataTableAddActionButtonIcon } from "@/components";
import Button from "@/components/Button/Button";
import CreateColumnForm from "@/containers/CreateColumnForm";
import UpdateColumnForm, { TColumnFormValueUpdate } from "@/containers/UpdatePeerEvaluationColumnForm";
import content from "@/content";
import { IColumnFormValue } from "@/forms/PeerEvaluationColumnForm";
import { ArrayObject } from "@/types/object";
import {
  FieldStatus,
  IPeerEvaluationColumn,
  PeerEvaluationColumnAction,
  peerEvaluationColumnOrder,
} from "@/types/peer-evaluation";
import { getDateLocaleString } from "@/utils/date";
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
      action: PeerEvaluationColumnAction.NONE,
    };

    setColumns([...columns, newColumn]);
  };

  const onColumnUpdateSelection = (data: ArrayObject) => {
    const dataColumn = getMergedKeyValuesObject(peerEvaluationColumnOrder, data) as unknown as IPeerEvaluationColumn;
    setUpdateColumn(dataColumn);
    setUpdatePeerEvaluationColumnOpen(true);
  };

  const onSubmitUpdateColumn = ({ description, action }: TColumnFormValueUpdate) => {
    const columnsUpdated = columns;

    const columnToUpdate = columns.filter(({ id }) => id === updateColumn?.id);

    const columnUpdatedIndex = columns.findIndex(({ id }) => id === updateColumn?.id);

    if (columnToUpdate[0].status != FieldStatus.NEW) {
      columnToUpdate[0].status = FieldStatus.UPDATED;
    }

    columnToUpdate[0].description = description;
    columnToUpdate[0].action = action;

    columnsUpdated[columnUpdatedIndex] = columnToUpdate[0];

    setColumns(columnsUpdated);

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

  const tableColumns: MUIDataTableColumn[] = [
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
        display: false,
        filterType: "textField",
        customBodyRender: (date: Date) => {
          return getDateLocaleString(date);
        },
      },
    },
    {
      name: "updatedAt",
      label: "Updated",
      options: {
        filter: true,
        sort: true,
        display: false,
        filterType: "textField",
        customBodyRender: (date: Date) => {
          return getDateLocaleString(date);
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
        <DataTableAddActionButtonIcon
          onClick={onAddColumn}
          testId={"peer-evaluation-column-management-add-column"}
          toolTipLabel={"Add column"}
        />
      ),
    rowsSelected: selectedRows,
    onRowSelectionChange: (_, __, rowsSelected) => {
      setSelectedRows(rowsSelected as []);
    },
    customToolbarSelect: (selectedRows, displayData) => (
      <DataTableEditDeleteToolbar
        editButton={{
          testId: "peer-evaluation-column-management-update-column",
          toolTipLabel: "Update column",
          onClick: () => onColumnUpdateSelection(displayData[selectedRows.data[0].index].data),
        }}
        deleteButton={{
          testId: "peer-evaluation-column-management-delete-column",
          toolTipLabel: "Delete column",
          onClick: () => onColumnDeleteSelection(displayData[selectedRows.data[0].index].data),
        }}
      />
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
        acceptText={content.containers.peerEvaluationColumnManagement.confirmationDeleteColumn.acceptText}
        alertText={content.containers.peerEvaluationColumnManagement.confirmationDeleteColumn.alertText}
        alertVariant={content.containers.peerEvaluationColumnManagement.confirmationDeleteColumn.alertVariant}
        closeText={content.containers.peerEvaluationColumnManagement.confirmationDeleteColumn.closeText}
        isAlertVisible
        isOpen={isDeletePeerEvaluationColumnConfirmationOpen}
        onAccept={onDeletePeerEvaluationColumnAccept}
        onClose={onDeletePeerEvaluationColumnCancel}
        testId={"peer-evaluation-column-management-confirmation-delete-column"}
        textContent={content.containers.peerEvaluationColumnManagement.confirmationDeleteColumn.bodyText}
        title={content.containers.peerEvaluationColumnManagement.confirmationDeleteColumn.title}
      />
    </FormControl>
  );
};

export default memo(PeerEvaluationColumnManagement);
