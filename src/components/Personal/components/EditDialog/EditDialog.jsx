import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import { createdWorkerShape } from '../../shapes';
import { EditWorkerForm } from '..';
import useStyles from './useStyles';

const EditDialog = ({
  open,
  onClose,
  workerToEdit,
  createNewWorker,
  editWorkerById,
}) => {
  const classes = useStyles();

  const handleSave = workerData => {
    if (workerToEdit) {
      editWorkerById(workerData);
    } else {
      createNewWorker(workerData);
    }
  }

  return (
    <Dialog maxWidth="md" disableBackdropClick fullWidth open={open}>
      <DialogTitle disableTypography>
        <Typography variant="h6">Новий користувач</Typography>
        <IconButton onClick={onClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <EditWorkerForm
          onCancel={onClose}
          onSave={handleSave}
          workerToEdit={workerToEdit}
        />
      </DialogContent>
    </Dialog>
  );
};

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  workerToEdit: createdWorkerShape,
  createNewWorker: PropTypes.func.isRequired,
  editWorkerById: PropTypes.func.isRequired,
};

EditDialog.defaultProps = {
  workerToEdit: null,
};

export default EditDialog;
