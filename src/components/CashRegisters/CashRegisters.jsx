import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import useStyles from './useStyles';
import {
  CashRegisterCard,
  AddNewCardButton,
  AddNewTerminalDialog,
  EditTerminalDialog,
} from './components';
import * as constants from './constants';

const CashRegisters = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [terminalToEdit, setTerminalToEdit] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [cashRegisters, setCashRegisters] = useState(constants.mockedCashRegisters);

  const handleCloseDialog = () => setDialogOpen(false);

  const handleOpenDialog = () => setDialogOpen(true);

  const handleEditDialogClose = () => setEditDialogOpen(false);

  const handleEditDialogOpen = () => setEditDialogOpen(true);

  const removeCashRegisterByOrder = orderToRemove => {
    setCashRegisters(prevCashRegisters =>
      prevCashRegisters.filter(({ order }) => order !== orderToRemove));
  }

  const handleEditTerminalByOrder = orderToFind => {
    const terminal = cashRegisters.find(({ order }) => order === orderToFind);

    setTerminalToEdit(terminal);

    handleEditDialogOpen();
  }

  const addNewCashRegister = outlet => {
    const lastCashRegister = cashRegisters[cashRegisters.length - 1];

    const currentOrder = lastCashRegister.order + 1;
    const currentSerialNumber = lastCashRegister.serialNumber + 1;

    const newCashRegister = {
      order: currentOrder,
      serialNumber: currentSerialNumber,
      activated: false,
      activationDate: null,
      name: `Каса ${currentOrder}`,
      outlet,
    };

    setCashRegisters(prevState => [...prevState, newCashRegister]);
  };

  const editCashRegisterByOrder = (editedCashRegister) => {
    const cashRegistersCopy = [...cashRegisters];
    const indexToEdit = cashRegisters.findIndex(({ order }) => editedCashRegister.order === order);

    if (indexToEdit !== -1) {
      cashRegistersCopy[indexToEdit] = editedCashRegister;
    }

    setCashRegisters(cashRegistersCopy);
  }

  return (
    <>
      <Typography className={classes.pageHeader} variant="h5">
        {t('cashRegisters.pageHeader.equipment')}
      </Typography>
      <Grid container spacing={2}>
        {
          cashRegisters.map(cashRegister => (
            <Grid xl={3} lg={4} md={6} sm={12} key={cashRegister.order} item>
              <CashRegisterCard
                removeCashRegisterByOrder={removeCashRegisterByOrder}
                onActivateClick={handleEditTerminalByOrder}
                {...cashRegister}
              />
            </Grid>
          ))
        }
        <Grid xl={3} lg={4} md={6} sm={12} item>
          <AddNewCardButton onClick={handleOpenDialog} />
        </Grid>
      </Grid>
      <AddNewTerminalDialog
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
        onSave={addNewCashRegister}
      />
      <EditTerminalDialog
        dialogOpen={editDialogOpen}
        onClose={handleEditDialogClose}
        cashRegister={terminalToEdit}
        editCashRegister={editCashRegisterByOrder}
      />
    </>
  );
}

export default CashRegisters;
