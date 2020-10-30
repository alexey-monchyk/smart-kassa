import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { createdWorkerShape } from '../../shapes';
import useStyles from './useStyles';
import { columns, positionsById } from './constants';

const WorkersTable = ({ workers, editWorkerById, deleteWorkerById }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = React.useMemo(() => workers.map(worker => ({
    id: worker.id,
    displayName: `${worker.name} ${worker.surname}`,
    position: positionsById[worker.position],
    phoneNumber: worker.phoneNumber,
    lastActivity: worker.lastActivity,
  })), [workers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow hover key={row.id}>
                {columns.map(column => {
                  const value = row[column.id];

                  if (column.id === 'actions') {
                    return (
                      <TableCell key="actions">
                        <IconButton onClick={() => editWorkerById(row.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteWorkerById(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )
                  }

                  return (
                    <TableCell key={column.id}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

WorkersTable.propTypes = {
  workers: PropTypes.arrayOf(createdWorkerShape),
  editWorkerById: PropTypes.func.isRequired,
  deleteWorkerById: PropTypes.func.isRequired,
};

WorkersTable.defaultProps = {
  workers: [],
};

export default WorkersTable;
