import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledHeaderTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: grey[900],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
