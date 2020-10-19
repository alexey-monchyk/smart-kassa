import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './useStyles';

const CashRegisterCard = ({
  name,
  order,
  activated,
  serialNumber,
  activationDate,
  removeCashRegisterByOrder,
  onActivateClick,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const activationLabel = activated ? t('cashRegisters.card.active') : t('cashRegisters.card.waitingActivation')

  const buttonActivationLabel = activated ? t('cashRegisters.card.deactivate') : t('cashRegisters.card.activate')

  return (
    <Card className={classes.root}>
      <CardHeader
        action={(
          <IconButton onClick={() => removeCashRegisterByOrder(order)}>
            <CloseIcon />
          </IconButton>
        )}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/images/payment-terminal.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Grid className={classes.header} justify="space-between" container spacing={2}>
            <Grid item>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <Chip color={activated ? 'primary' : 'default'} label={activationLabel} />
            </Grid>
          </Grid>
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
            {serialNumber}
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
            {activationDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant={activated ? 'text' : 'contained'}
          fullWidth
          color={activated ? 'default' : 'secondary'}
          onClick={() => onActivateClick(order)}
        >
          {buttonActivationLabel}
        </Button>
      </CardActions>
    </Card>
  );
};

CashRegisterCard.propTypes = {
  order: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  activated: PropTypes.bool.isRequired,
  serialNumber: PropTypes.number.isRequired,
  activationDate: PropTypes.string,
  removeCashRegisterByOrder: PropTypes.func.isRequired,
  onActivateClick: PropTypes.func.isRequired,
};

CashRegisterCard.defaultProps = {
  activationDate: '-',
};

export default CashRegisterCard;
