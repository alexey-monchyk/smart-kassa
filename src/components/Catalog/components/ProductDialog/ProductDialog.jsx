import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './useStyles';
import * as constants from './constants';

const ProductDialog = ({ open, handleClose, addNewProduct, productToEdit, saveEditedProduct }) => {
  const classes = useStyles();
  const [product, setProduct] = useState(constants.initialProductValues);

  useEffect(() => {
    if (productToEdit) setProduct(prevValues => ({ ...prevValues, ...productToEdit }));
  }, [productToEdit]);

  const clearProductForm = () => setProduct(constants.initialProductValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productToEdit) {
      addNewProduct(product);
    } else {
      saveEditedProduct(product);
    }

    clearProductForm();
    handleClose();
  }

  const handleChangeProduct = (e) => {
    e.persist();

    setProduct(prevValues => ({ ...prevValues, [e.target.name]: e.target.value }));
  }

  const handleChangeSoldByWeight = (e) => {
    e.persist();

    setProduct(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.checked,
      unitTypeId: e.target.checked ? 26 : 2,
    }));
  }

  const unitTypes = product.soldByWeight
    ? constants.unitTypesByMeasurable
    : constants.unitTypesByPiece;

  return (
    <Dialog className={classes.contentContainer} disableBackdropClick maxWidth="md" fullWidth open={open}>
      <DialogTitle disableTypography>
        <Typography variant="h6">Додати товар</Typography>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container justify="center" spacing={2}>
            <Grid xs={6} container item spacing={2}>
              <Grid xs={12} item>
                <TextField
                  value={product.barcode}
                  onChange={handleChangeProduct}
                  name="barcode"
                  variant="outlined"
                  label="Штрих код (EAN13)"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  value={product.name}
                  onChange={handleChangeProduct}
                  name="name"
                  variant="outlined"
                  required
                  autoFocus
                  label="Назва товару"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  value={product.alterNumber}
                  onChange={handleChangeProduct}
                  name="alterNumber"
                  variant="outlined"
                  label="Артикуль"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <FormControl fullWidth required variant="outlined">
                  <InputLabel>Каталог</InputLabel>
                  <Select
                    onChange={handleChangeProduct}
                    name="catalogId"
                    value={product.catalogId}
                    label="Каталог"
                  >
                    <MenuItem value="1">Побутова хімія</MenuItem>
                    <MenuItem value="2">Продукти</MenuItem>
                    <MenuItem value="3">Для кухні</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid xs={6} container item spacing={2}>
              <Grid xs={12} item>
                <FormLabel component="legend">Тип продажу</FormLabel>
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Grid item>Поштучно</Grid>
                  <Grid item>
                    <Switch checked={product.soldByWeight} name="soldByWeight" onChange={handleChangeSoldByWeight} />
                  </Grid>
                  <Grid item>Вимірна</Grid>
                </Grid>
              </Grid>
              <Grid xs={12} container item spacing={1}>
                <Grid xs={6} item>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel>Ціна продажу</InputLabel>
                    <OutlinedInput
                      value={product.price}
                      onChange={handleChangeProduct}
                      name="price"
                      label="Ціна продажу"
                      placeholder="0"
                      fullWidth
                      startAdornment={<InputAdornment position="start">₴</InputAdornment>}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={6} item>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel>Одиниці виміру</InputLabel>
                    <Select
                      onChange={handleChangeProduct}
                      name="unitTypeId"
                      value={product.unitTypeId}
                      label="Одиниці виміру"
                    >
                      {
                        unitTypes.map(({ name, value }) =>
                          <MenuItem key={value} value={value}>{name}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid xs={12} item>
                <TextField
                  value={product.alterTitle}
                  onChange={handleChangeProduct}
                  name="alterTitle"
                  variant="outlined"
                  label="Власна назва товару"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  value={product.description}
                  onChange={handleChangeProduct}
                  name="description"
                  variant="outlined"
                  label="Опис"
                  rowsMax={1}
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid xs={12} item container spacing={2} justify="flex-end">
              <Grid item>
                <Button onClick={handleClose} color="primary">
                  Скасувати
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Зберегти
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  )
};

ProductDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addNewProduct: PropTypes.func.isRequired,
  saveEditedProduct: PropTypes.func.isRequired,
  productToEdit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    barcode: PropTypes.string,
    alterNumber: PropTypes.string,
    catalogId: PropTypes.string.isRequired,
    soldByWeight: PropTypes.bool.isRequired,
    price: PropTypes.string.isRequired,
    unitTypeId: PropTypes.number.isRequired,
    alterTitle: PropTypes.string,
    description: PropTypes.string,
  }),
};

ProductDialog.defaultProps = {
  productToEdit: null,
}

export default ProductDialog;
