import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  tableHead: {
    backgroundColor: theme.palette.secondary.main,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
  },
}));

export default useStyles;
