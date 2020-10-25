import React, { useState } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { ProductsTableHeader, ProductDialog } from '..';
import { unitTypeById } from './constants';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(2),
  },
}));

const initialColumns = [
  { field: 'name', headerName: 'Назва', sortable: false, width: 400 },
  { field: 'unitType', headerName: 'Од. прод.', width: 150 },
  { field: 'displayPrice', headerName: 'Ціна за од.', width: 200 },
  { field: 'alterNumber', headerName: 'Артикул', width: 500 },
];

const initialRows = [
  { id: 1, name: 'Миючий засіб Domestos', unitType: 'Штука', unitTypeId: 2, price: '69', displayPrice: '₴ 69', alterNumber: '8717163094952', catalogId: '1', soldByWeight: false },
  { id: 2, name: 'Засіб туалетне каченя', unitType: 'Штука', unitTypeId: 2, price: '82', displayPrice: '₴ 82', alterNumber: '87171630961234', catalogId: '1', soldByWeight: false },
  { id: 3, name: 'Засіб дезінфікуючий Domestos', unitType: 'Штука', unitTypeId: 2, price: '35', displayPrice: '₴ 35', alterNumber: '812347163123421', catalogId: '1', soldByWeight: false },
  { id: 4, name: 'Відбілювач для білизни Vanish', unitType: 'Штука', unitTypeId: 2, price: '120', displayPrice: '₴ 120', alterNumber: '8717163094952', catalogId: '1', soldByWeight: false },
  { id: 5, name: 'Засіб для делікатного прання перволь', unitType: 'Штука', unitTypeId: 2, price: '92', displayPrice: '₴ 92', alterNumber: '8717163094952', catalogId: '1', soldByWeight: false },
  { id: 6, name: 'Рідина для миття посуду Fairy', unitType: 'Штука', unitTypeId: 2, price: '42', displayPrice: '₴ 42', alterNumber: '8717163094952', catalogId: '1', soldByWeight: false },
];

const ProductsTable = () => {
  const [rows, setRows] = useState(initialRows);
  const [columns, setColumns] = useState(initialColumns);
  const [filteredRows, setFilteredRows] = useState(initialRows);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const classes = useStyles();

  const addNewRow = product => {
    const newRow = {
      ...product,
      id: rows[rows.length - 1].id + 1,
      displayPrice: `₴ ${product.price}`,
      unitType: unitTypeById.find(({ value }) => value === product.unitTypeId).name,
    }

    setRows(prevRows => [...prevRows, newRow]);
    setFilteredRows(prevRows => [...prevRows, newRow]);
  }

  const handleDeleteRows = selectedIds => e => {
    e.stopPropagation();

    setRows(prevRows => prevRows.filter(row => !selectedIds.includes(row.id)));
    setFilteredRows(prevRows => prevRows.filter(row => !selectedIds.includes(row.id)));
  }

  const handleCloseProductDialog = () => setIsProductDialogOpen(false);

  const handleOpenProductDialog = () => setIsProductDialogOpen(true);

  const handleSelectRows = selected => {
    const updatedColumns = [...columns];

    if (selected.rows.length > 0) {
      const selectedIds = selected.rows.map(({ id }) => id)

      updatedColumns[0].headerName = (
        <IconButton onClick={handleDeleteRows(selectedIds)}>
          <DeleteIcon />
        </IconButton>
      )
    } else {
      updatedColumns[0].headerName = 'Назва'
    }

    setColumns(updatedColumns);
  }

  const saveEditedProduct = product => {
    const rowsCopy = [...filteredRows];

    const indexToEdit = rowsCopy.findIndex(({ id }) => id === product.id);

    if (indexToEdit !== -1) {
      rowsCopy[indexToEdit] = product;

      setFilteredRows(rowsCopy);
      setRows(rowsCopy);
    }

    setProductToEdit(null);
  }

  const filterByName = searchName => {
    if (!searchName) setFilteredRows(rows);

    const filteredRowsByName = rows.filter(({ name }) =>
      name.toLowerCase().includes(searchName.toLowerCase().trim()));

    setFilteredRows(filteredRowsByName);
  }

  const handleRowClick = row => {
    setProductToEdit(row.data);

    handleOpenProductDialog();
  };

  return (
    <div className={classes.root}>
      <ProductsTableHeader
        title="Всі товари"
        handleFilterByName={filterByName}
        handleOpenDialog={handleOpenProductDialog}
      />
      <DataGrid
        columns={columns}
        rows={filteredRows}
        autoHeight
        checkboxSelection
        onSelectionChange={handleSelectRows}
        onRowClick={handleRowClick}
        disableSelectionOnClick
      />
      <ProductDialog
        productToEdit={productToEdit}
        addNewProduct={addNewRow}
        open={isProductDialogOpen}
        handleClose={handleCloseProductDialog}
        saveEditedProduct={saveEditedProduct}
      />
    </div>
  );
};

export default ProductsTable;
