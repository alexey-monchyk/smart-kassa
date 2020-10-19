import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import * as constants from './constants';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  forControl: {
    marginTop: 20,
  },
  descriptionItem: {
    marginTop: 10,
  },
}));

const EditTerminalDialog = ({ cashRegister, dialogOpen, onClose, editCashRegister }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [outlet, setOutlet] = useState('');
  const [name, setName] = useState();

  const handleChange = e => setName(e.target.value);

  const handleChangeOutlet = e => setOutlet(e.target.value);

  const handleSaveEditedTerminal = () => {
    editCashRegister({
      ...cashRegister,
      name,
      outlet,
    });

    onClose();
  }

  useEffect(() => {
    if (cashRegister) {
      setName(cashRegister.name)
      setOutlet(cashRegister.outlet);
    }
  }, [cashRegister]);

  if (!cashRegister) return null;

  return (
    <Dialog
      fullWidth
      disableBackdropClick
      open={dialogOpen}
    >
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">
          {t('cashRegisters.editTerminalDialog.terminalManagement')}
          :&nbsp;
          {cashRegister.name}
        </Typography>
        <IconButton onClick={onClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
          >
            {t('cashRegisters.card.serialNumber')}
            :
          </Typography>
          &nbsp;#
          {cashRegister.serialNumber}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.descriptionItem}>
          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
          >
            {t('cashRegisters.card.activationDate')}
            :
          </Typography>
          &nbsp;
          {cashRegister.activationDate}
        </Typography>
        <TextField
          label={t('cashRegisters.editTerminalDialog.name')}
          variant="outlined"
          fullWidth
          margin="dense"
          value={name}
          onChange={handleChange}
          className={classes.forControl}
        />
        <FormControl
          margin="dense"
          required
          fullWidth
          variant="outlined"
          className={classes.forControl}
        >
          <InputLabel>{t('cashRegisters.addNewTerminalDialog.outlet')}</InputLabel>
          <Select
            label={t('cashRegisters.addNewTerminalDialog.outlet')}
            value={outlet}
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
        <Button onClick={onClose} variant="text" color="primary">
          {t('cashRegisters.editTerminalDialog.cancel')}
        </Button>
        <Button onClick={handleSaveEditedTerminal} variant="contained" color="primary">
          {t('cashRegisters.editTerminalDialog.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditTerminalDialog.propTypes = {
  cashRegister: PropTypes.shape({
    name: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    activationDate: PropTypes.string,
    serialNumber: PropTypes.number,
    activated: PropTypes.bool.isRequired,
    outlet: PropTypes.string.isRequired,
  }),
  dialogOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editCashRegister: PropTypes.func.isRequired,
};

EditTerminalDialog.defaultProps = {
  cashRegister: null,
};

export default EditTerminalDialog;
