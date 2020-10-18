import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { PhoneNumberMask } from 'shared';
import * as constants from './constants';

const CreateNewDialogForm = ({ handleClose, addNewOutlet }) => {
  const [outletFormValues, setOutletFormValues] = useState(constants.initialOutletFormValues);
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewOutlet(outletFormValues);
    handleClose();
  }

  const handleChangeOutletFormValues = (e) => {
    e.persist();

    setOutletFormValues(prevValues => ({ ...prevValues, [e.target.name]: e.target.value }));
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            value={outletFormValues.name}
            onChange={handleChangeOutletFormValues}
            name="name"
            autoFocus
            variant="outlined"
            required
            label={t('outlets.createNewDialog.name of outlet')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required variant="outlined">
            <InputLabel>{t('outlets.createNewDialog.status')}</InputLabel>
            <Select onChange={handleChangeOutletFormValues} name="status" value={outletFormValues.status}>
              <MenuItem value="active">{t('outlets.createNewDialog.active')}</MenuItem>
              <MenuItem value="inactive">{t('outlets.createNewDialog.inactive')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChangeOutletFormValues}
            value={outletFormValues.city}
            name="city"
            fullWidth
            variant="outlined"
            required
            label={t('outlets.createNewDialog.city')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleChangeOutletFormValues}
            value={outletFormValues.address}
            name="address"
            variant="outlined"
            required
            label={t('outlets.createNewDialog.address')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChangeOutletFormValues}
            value={outletFormValues.phoneNumber}
            name="phoneNumber"
            variant="outlined"
            InputProps={{ inputComponent: PhoneNumberMask }}
            label={t('outlets.createNewDialog.phoneNumber')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChangeOutletFormValues}
            value={outletFormValues.email}
            name="email"
            variant="outlined"
            label={t('outlets.createNewDialog.email')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleChangeOutletFormValues}
            value={outletFormValues.website}
            name="website"
            variant="outlined"
            label={t('outlets.createNewDialog.website')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button fullWidth onClick={handleClose} color="primary">
            {t('outlets.createNewDialog.cancel')}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            {t('outlets.createNewDialog.create')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

CreateNewDialogForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  addNewOutlet: PropTypes.func.isRequired,
};

export default CreateNewDialogForm;
