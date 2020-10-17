import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { rows } from './constants';
import useStyles from './useStyles';
import {
  StyledTableCell,
  StyledTableRow,
  StyledHeaderTableCell,
} from './components';

const CashRegisters = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const headerItems = [
    t('outlets.tableHeader.Outlet name'),
    t('outlets.tableHeader.Address'),
    t('outlets.tableHeader.Status'),
    t('outlets.tableHeader.Equipment'),
    t('outlets.tableHeader.Workers'),
  ];

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h5">
          {t('outlets.pageHeader.My outlets')}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
        >
          {t('buttonLabels.Add new outlet')}
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headerItems.map(
                (headerItem) => (
                  <StyledHeaderTableCell key={headerItem}>{headerItem}</StyledHeaderTableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.calories}</StyledTableCell>
                <StyledTableCell>{row.fat}</StyledTableCell>
                <StyledTableCell>{row.carbs}</StyledTableCell>
                <StyledTableCell>{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        labelRowsPerPage={false}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CashRegisters;
