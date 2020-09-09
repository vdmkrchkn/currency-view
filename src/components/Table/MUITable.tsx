import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
// eslint-disable-next-line no-unused-vars
import {TablePaginationActionsProps} from '@material-ui/core/TablePagination/TablePaginationActions';

import {makeStyles, withStyles, useTheme} from '@material-ui/core/styles';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

interface ITableProps {
  data: any[],
  fields: string[],
}

const useStylesPagination = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const TablePaginationActions = ({count, page, rowsPerPage, onChangePage}: TablePaginationActionsProps) => {
  const classes = useStylesPagination();
  const theme = useTheme();

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        color="primary"
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        color="secondary"
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        color="secondary"
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        color="primary"
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

const useStyles = makeStyles({
  table: {
    width: '40vmax',
    tableLayout: 'fixed',
  },
});

const StyledTableCell = withStyles(theme => ({
  root: {
    color: theme.palette.common.white,
    border: '1px dashed #666',
    padding: '4px',
  },
  head: {
    letterSpacing: '2px',
    fontWeight: 'bold',
  },
  body: {
    letterSpacing: '1px',
  },
  footer: {
    borderBottom: 'none',
  },
}))(TableCell);

const MUITable = ({data, fields}: ITableProps) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Table className={classes.table} aria-label="material data table">
      <TableHead>
        <TableRow>
          {fields.map(field => (<StyledTableCell key={field} align="center">{field}</StyledTableCell>))}
        </TableRow>
      </TableHead>
      <TableBody>
        {(rowsPerPage > 0 ?
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
            data
        ).map(elem => (
          <TableRow key={elem[fields[0]]}>
            {fields.map(field => (
              <StyledTableCell key={elem[fields[0]] + field} scope="row" align="center">
                {elem[field]}
              </StyledTableCell>))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, {value: -1, label: 'All'}]}
            colSpan={3}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {'aria-label': 'rows per page'},
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default MUITable;
