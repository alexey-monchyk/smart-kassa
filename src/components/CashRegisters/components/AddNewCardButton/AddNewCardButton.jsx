import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    border: `2px dashed ${theme.palette.secondary.main}`,
    minWidth: 300,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const AddNewCardButton = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Button
      className={classes.root}
      startIcon={<AddIcon fontSize="large" color="secondary" />}
    >
      {t('cashRegisters.card.addNew')}
    </Button>
  );
};

export default AddNewCardButton;
