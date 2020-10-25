import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { EditCatalogDialog } from '..';
import CatalogsListItem from './CatalogsListItem';
import useStyles from './useStyles';

const allProducts = { name: 'Всі товари', productsQty: 6 };

const mockedCatalogs = [
  { id: 1, name: 'Побутова хімія', productsQty: 3, parentCatalogId: '' },
  { id: 2, name: 'Продукти', productsQty: 1, parentCatalogId: '' },
  { id: 3, name: 'Для кухні', productsQty: 2, parentCatalogId: '' },
];

const CatalogsList = () => {
  const [isEditCatalogDialogOpen, setIsEditCatalogDialogOpen] = useState(false);
  const [catalogs, setCatalogs] = useState(mockedCatalogs);
  const [catalogToEdit, setCatalogToEdit] = useState(null);
  const classes = useStyles();
  const params = useParams();

  const deleteCatalogById = catalogId => {
    setCatalogs(prevCatalogs => prevCatalogs.filter(({ id }) => id !== catalogId));
  }

  const handleCloseEditCatalogDialog = () => setIsEditCatalogDialogOpen(false);

  const handleOpenEditCatalogDialog = () => setIsEditCatalogDialogOpen(true);

  const saveEditedCatalog = catalog => {
    const catalogsCopy = [...catalogs];

    const indexToEdit = catalogsCopy.findIndex(({ id }) => id === catalog.id);

    if (indexToEdit !== -1) {
      catalogsCopy[indexToEdit] = catalog;

      setCatalogs(catalogsCopy);
    }

    setCatalogToEdit(null);
  }

  const handleCatalogItemClick = catalog => {
    setCatalogToEdit(catalog);

    handleOpenEditCatalogDialog();
  };

  const createNewCatalog = catalog => {
    const lastCatalogId = catalogs[catalogs.length - 1].id;

    const newCatalog = {
      id: lastCatalogId + 1,
      productsQty: 0,
      ...catalog,
    }

    setCatalogs(prevCatalogs => [...prevCatalogs, newCatalog]);
  }

  return (
    <>
      <div className={classes.listHeader}>
        <Typography variant="h6" className={classes.listTitle}>
          Каталоги
        </Typography>
        <Button onClick={handleOpenEditCatalogDialog} startIcon={<AddIcon />} color="primary">
          Створити
        </Button>
      </div>
      <div className={classes.listContainer}>
        <List>
          <CatalogsListItem
            catalog={allProducts}
            selected={!params.catalogId}
          />
          {
            catalogs.map(catalog => (
              <CatalogsListItem
                editCatalog={handleCatalogItemClick}
                onDelete={deleteCatalogById}
                catalog={catalog}
                key={catalog.id}
                selected={params.catalogId === catalog.id}
              />
            ))
          }
        </List>
        <EditCatalogDialog
          open={isEditCatalogDialogOpen}
          onClose={handleCloseEditCatalogDialog}
          createNewCatalog={createNewCatalog}
          saveEditedCatalog={saveEditedCatalog}
          catalogToEdit={catalogToEdit}
        />
      </div>
    </>
  );
};

export default CatalogsList;
