import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import useStyles from './useStyles';

const AddNewCardButton = ({ onClick }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Button
      className={classes.root}
      startIcon={<AddIcon fontSize="large" color="secondary" />}
      onClick={onClick}
    >
      {t('cashRegisters.card.addNew')}
    </Button>
  );
};

AddNewCardButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddNewCardButton;
