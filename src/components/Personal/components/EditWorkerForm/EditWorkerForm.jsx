import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { PhoneNumberMask } from 'shared';
import { createdWorkerShape } from '../../shapes';
import * as constants from './constants';

const EditWorkerForm = ({ onCancel, onSave, workerToEdit }) => {
  const [workerData, setWorkerData] = React.useState(constants.initialWorkerFormaValues);

  React.useEffect(() => {
    if (workerToEdit) setWorkerData({ ...workerData, ...workerToEdit });
  }, [workerToEdit]);

  const handleChange = e => {
    e.persist();

    setWorkerData(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const clearWorkerData = () => setWorkerData(constants.initialWorkerFormaValues);

  const handleCancel = () => {
    onCancel();

    clearWorkerData();
  }

  const handleSave = () => {
    onSave({ ...workerToEdit, ...workerData });

    handleCancel();
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={6} item>
        <TextField
          name="name"
          variant="outlined"
          required
          autoFocus
          label="Ім'я"
          value={workerData.name}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid xs={6} item>
        <TextField
          name="surname"
          variant="outlined"
          required
          label="Прізвище"
          value={workerData.surname}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid xs={6} item>
        <TextField
          name="patronymic"
          variant="outlined"
          placeholder="По-Батькові"
          required
          label="По-Батькові"
          value={workerData.patronymic}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid xs={6} item>
        <TextField
          name="personalIncomeTax"
          variant="outlined"
          placeholder="ІПН"
          label="ІПН"
          value={workerData.personalIncomeTax}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="phoneNumber"
          variant="outlined"
          InputProps={{ inputComponent: PhoneNumberMask }}
          label="Телефон"
          value={workerData.phoneNumber}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid xs={6} item>
        <TextField
          name="email"
          variant="outlined"
          placeholder="personalmail@gmail.com"
          required
          label="Email"
          value={workerData.email}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth required variant="outlined">
          <InputLabel>Посада</InputLabel>
          <Select
            onChange={handleChange}
            name="position"
            required
            value={workerData.position}
            label="Посада"
          >
            {
              constants.positions.map(position => (
                <MenuItem key={position.id} value={position.id}>{position.title}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={6} item>
        <TextField
          name="accessCode"
          variant="outlined"
          required
          label="Код доступу до каси"
          value={workerData.accessCode}
          onChange={handleChange}
          type="number"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button onClick={handleCancel} fullWidth color="primary">
          Скасувати
        </Button>
      </Grid>
      <Grid onClick={handleSave} item xs={12} sm={6}>
        <Button fullWidth type="submit" variant="contained" color="primary">
          Зберегти
        </Button>
      </Grid>
    </Grid>
  );
};

EditWorkerForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  workerToEdit: createdWorkerShape,
};

EditWorkerForm.defaultProps = {
  workerToEdit: null,
};

export default EditWorkerForm;
