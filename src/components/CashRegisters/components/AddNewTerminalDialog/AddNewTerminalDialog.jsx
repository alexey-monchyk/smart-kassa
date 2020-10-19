import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './useStyles';
import * as constants from './constants';

const AddNewTerminalDialog = ({ handleCloseDialog, dialogOpen, onSave }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [selectedOutlet, setSelectedOutlet] = useState('');

  const handleChangeOutlet = e => setSelectedOutlet(e.target.value);

  const handleSave = () => {
    onSave(selectedOutlet);

    handleCloseDialog();
  };

  return (
    <Dialog
      open={dialogOpen}
      fullWidth
      disableBackdropClick
    >
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{t('cashRegisters.addNewTerminalDialog.title')}</Typography>
        <IconButton className={classes.closeButton} onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormControl required fullWidth variant="outlined">
          <InputLabel>{t('cashRegisters.addNewTerminalDialog.outlet')}</InputLabel>
          <Select
            label={t('cashRegisters.addNewTerminalDialog.outlet')}
            value={selectedOutlet}
            onChange={handleChangeOutlet}
          >
            {
              constants.mockedOutlets.map(outletName => (
                <MenuItem
                  key={outletName}
                  value={outletName}
                >
                  {outletName}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          {t('cashRegisters.addNewTerminalDialog.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddNewTerminalDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddNewTerminalDialog;
