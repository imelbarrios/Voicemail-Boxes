import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../css/Messages.css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'folder', label: 'Status' },
  { id: 'from', label: 'From' },
  {
    id: 'to',
    label: 'To',
    
  },
  
  {
    id: 'timestamp',
    label: 'Duration',
    
    format: (value) => value.toFixed(2),
  },
];

function createData(folder, from, to ,timestamp ) {
  
  return { folder, from, to ,timestamp  };
  
}

const rows = [
  createData('New', '1001@aeac33.sip.2600hz.com', '1000@aeac33.sip.2600hz.com', '18:42'),
  createData('New', '1001@aeac33.sip.2600hz.com', '1000@aeac33.sip.2600hz.com', '10:00'),
  createData('Saved', '1001@aeac33.sip.2600hz.com', '1000@aeac33.sip.2600hz.com', '18:42'),
  createData('Delete', '1001@aeac33.sip.2600hz.com', '1000@aeac33.sip.2600hz.com', '8:42'),
  createData('Saved', '1001@aeac33.sip.2600hz.com', '1000@aeac33.sip.2600hz.com', '15:42'),
  createData('Saved', '1001@aeac33.sip.2600hz.com', '1000@aeac33.sip.2600hz.com', '1:42'),
  createData('New', '1001@aeac33.sip.2600hz.com', '1000@aeac33.sip.2600hz.com', '8:42'),


]

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 400,
  },
});



export default function Messages() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="messages">
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </div>
  );
}
