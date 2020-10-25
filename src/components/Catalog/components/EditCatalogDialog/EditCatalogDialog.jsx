import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './useStyles';

const initialCatalogFormValues = {
  name: '',
  parentCatalogId: '',
};

const EditCatalogDialog = ({
  open,
  onClose,
  catalogToEdit,
  createNewCatalog,
  saveEditedCatalog,
}) => {
  const [catalog, setCatalog] = useState(initialCatalogFormValues);
  const classes = useStyles();

  useEffect(() => {
    if (catalogToEdit) setCatalog(catalogToEdit);
  }, [catalogToEdit]);

  const handleChangeCatalog = e => {
    e.persist();

    setCatalog(prevValues => ({ ...prevValues, [e.target.name]: e.target.value }));
  }

  const clearCatalogValues = () => setCatalog(initialCatalogFormValues);

  const handleSave = () => {
    if (catalogToEdit) {
      saveEditedCatalog(catalog);
    } else {
      createNewCatalog(catalog);
    }

    clearCatalogValues();
    onClose();
  }

  return (
    <Dialog disableBackdropClick fullWidth open={open}>
      <DialogTitle disableTypography>
        <Typography variant="h6">Налаштування каталогу</Typography>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container justify="center" spacing={2}>
          <Grid xs={12} item>
            <TextField
              value={catalog.name}
              onChange={handleChangeCatalog}
              name="name"
              variant="outlined"
              required
              autoFocus
              label="Назва каталогу"
              fullWidth
            />
          </Grid>
          <Grid xs={12} item>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Батьківській каталог</InputLabel>
              <Select
                onChange={handleChangeCatalog}
                name="parentCatalogId"
                value={catalog.parentCatalogId}
                label="Батьківській каталог"
              >
                <MenuItem value="1">Побутова хімія</MenuItem>
                <MenuItem value="2">Продукти</MenuItem>
                <MenuItem value="3">Для кухні</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Скасувати
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Зберегти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditCatalogDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createNewCatalog: PropTypes.func.isRequired,
  catalogToEdit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    parentCatalogId: PropTypes.string.isRequired,
    productsQty: PropTypes.number.isRequired,
  }),
  saveEditedCatalog: PropTypes.func.isRequired,
};

EditCatalogDialog.defaultProps = {
  catalogToEdit: null,
};

export default EditCatalogDialog;
