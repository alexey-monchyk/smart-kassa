import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import useStyles from './useStyles';
import { CashRegisterCard, AddNewCardButton } from './components';

const mockedCashRegisters = [
  { order: 1, activated: false, serialNumber: 123, activationDate: '' },
  { order: 2, activated: true, serialNumber: 124, activationDate: '11.10.2020' },
  { order: 3, activated: false, serialNumber: 125, activationDate: '' },
  { order: 4, activated: false, serialNumber: 126, activationDate: '' },
  { order: 5, activated: true, serialNumber: 127, activationDate: '14.10.2020' },
  { order: 6, activated: true, serialNumber: 128, activationDate: '15.10.2020' },
  { order: 7, activated: false, serialNumber: 129, activationDate: '' },
];

const CashRegisters = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.pageHeader} variant="h5">
        {t('cashRegisters.pageHeader.equipment')}
      </Typography>
      <Grid container spacing={2}>
        {
          mockedCashRegisters.map(cashRegister => (
            <Grid xl={3} lg={4} md={6} sm={12} key={cashRegister.order} item>
              <CashRegisterCard {...cashRegister} />
            </Grid>
          ))
        }
        <Grid xl={3} lg={4} md={6} sm={12} item>
          <AddNewCardButton />
        </Grid>
      </Grid>
    </>
  );
}

export default CashRegisters;
