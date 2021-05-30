
import React from "react";
import styled from "styled-components/macro";
import {
  Chip,
  Grid,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import EditTask from './editTask'
import { spacing } from "@material-ui/system";
import SnackBar from '../core/snackbar'
const Paper = styled(MuiPaper)(spacing);


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "task_name", alignment: "left", label: "Task name" },
  { id: "assignee", alignment: "left", label: "Assignee" },
  { id: "reporter", alignment: "left", label: "Reporter" },
  { id: "status", alignment: "left", label: "Status" },
  { id: "project", alignment: "left", label: "Project" },
  { id: "actions", alignment: "center", label: "Action" },
];



function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



function EnhancedTable({ tasks }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);




  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tasks.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tasks.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tasks.length}
            />
            <TableBody>
              {stableSort(tasks, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.title}-${index}`}
                      selected={isItemSelected}
                    >
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left"><Chip size="small" label={row.assignee && row.assignee.full_name} color="primary" /></TableCell>
                      <TableCell align="left"><Chip size="small" label={row.follower && row.follower.full_name} color="primary" /></TableCell>
                      <TableCell>
                      {
                        row.status === "Open" && (<Chip size="small" label={row.status} style={{ background: "rgb(245, 124, 0)", color:"rgb(255, 255, 255)" }} />)
                      }
                      {
                        row.status === "Closed" && (<Chip size="small" label={row.status} style={{ background: "rgb(244, 67, 54)", color:"rgb(255, 255, 255)" }} />)
                      }
                      {
                        row.status === "Done" && (<Chip size="small" label={row.status} style={{ background: "rgb(76, 175, 80)", color:"rgb(255, 255, 255)" }} />)
                      }

                      </TableCell>
                      <TableCell align="left">{row.project_id.name}</TableCell>
                      <TableCell padding="none" align="right">
                        <EditTask editTask={row} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 20 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function TaskListing({ taskList }) {
  return (
    <React.Fragment>
      <Grid container spacing={6} justify="center">
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <EnhancedTable tasks={taskList} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TaskListing;
