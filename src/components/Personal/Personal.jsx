import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './useStyles';
import {
  WorkersTable,
  EditDialog,
} from './components';
import { initialWorkers } from './constants';

const Personal = () => {
  const [workers, setWorkers] = React.useState(initialWorkers);
  const [isEditDialogOpen, setIsDialogOpen] = React.useState(false);
  const [workerToEdit, setWorkerToEdit] = React.useState(null);

  const classes = useStyles();

  const handleCloseEditDialog = () => {
    setWorkerToEdit(null);

    setIsDialogOpen(false);
  }

  const handleOpenEditDialog = () => setIsDialogOpen(true);

  const createNewWorker = worker => {
    const lastWorkerId = workers[workers.length - 1].id;
    const currentId = lastWorkerId + 1;

    const newWorker = {
      id: currentId,
      lastActivity: new Date().toLocaleDateString(),
      ...worker,
    };

    setWorkers(prevState => [...prevState, newWorker]);
  }

  const editWorkerById = workerIdToEdit => {
    setWorkerToEdit(workers.find(worker => worker.id === workerIdToEdit));

    handleOpenEditDialog();
  }

  const deleteWorkerById = workerIdToDelete => {
    setWorkers(prevWorkers => prevWorkers.filter(worker => workerIdToDelete !== worker.id));
  }

  const saveEditedWorker = worker => {
    const indexToEdit = workers.findIndex(({ id }) => id === worker.id);

    if (indexToEdit !== -1) {
      workers[indexToEdit] = worker;

      setWorkers(workers);
    }

    setWorkerToEdit(null);
  }

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h5">Працівники</Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={handleOpenEditDialog}
        >
          Додати працівника
        </Button>
      </div>
      <WorkersTable
        workers={workers}
        editWorkerById={editWorkerById}
        deleteWorkerById={deleteWorkerById}
      />
      <EditDialog
        onClose={handleCloseEditDialog}
        open={isEditDialogOpen}
        createNewWorker={createNewWorker}
        editWorkerById={saveEditedWorker}
        workerToEdit={workerToEdit}
      />
    </>
  );
};

export default Personal;
