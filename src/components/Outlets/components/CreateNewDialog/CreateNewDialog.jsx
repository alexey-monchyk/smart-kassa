import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { CreateNewDialogForm } from '..';

const CreateNewDialog = ({ open, handleClose, addNewOutlet }) => {
  const { t } = useTranslation();

  return (
    <Dialog disableBackdropClick fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{t('outlets.createNewDialog.title')}</DialogTitle>
      <DialogContent>
        <CreateNewDialogForm addNewOutlet={addNewOutlet} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
};

CreateNewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addNewOutlet: PropTypes.func.isRequired,
};

export default CreateNewDialog;
