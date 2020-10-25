import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listContainer: {
    backgroundColor: theme.palette.background.paper,
  },
  listTitle: {
    margin: theme.spacing(2, 0, 2),
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default useStyles;
