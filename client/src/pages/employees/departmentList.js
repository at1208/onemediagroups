import React from "react";
import { useHistory } from "react-router-dom";
import {
  Checkbox,
  Grid,
  IconButton,
  Link,
  Breadcrumbs  ,
  Divider ,
  Paper  ,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
} from "@material-ui/icons";
import { getDepartments } from '../../actions/department';
import moment from 'moment';




const headCells = [
    { id: "department_name", numeric: false, disablePadding: true, label: "Department Name" },
    { id: "created_at", numeric: false, disablePadding: false, label: "Created At" },
    { id: "View", numeric: false, disablePadding: false, label: "View" },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            <TableSortLabel>
              <b>{headCell.label}</b>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



function EnhancedTable() {
  const history = useHistory();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [showEmployee, setShowEmployee] = React.useState(false);

  React.useEffect(() => {
     getDepartments()
       .then( response => {
         if(response && response.departments){
           let departmentData = response.departments.map((item) => {
             let { department_name, createdAt, _id} = item;
             return {
                _id,
                 department_name,
                 createdAt
             }
           })
           setRows(departmentData)
         }
       })
       .catch((err) => {
         console.log(err)
       })
  }, [])



  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <TableContainer>
          <Table
            size={"small"}
          >
            <EnhancedTableHead />
            <TableBody>
              { rows
                .map((row, index) => {
                  const isItemSelected = isSelected(row.department_name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.department_name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                    {row.department_name}
                      </TableCell>
                      <TableCell align="left">{  moment(row.createdAt).format('Do MMMM  YYYY')}</TableCell>
                      <TableCell align="left"> <Button onClick={() => history.push(`/employee-detail/${row._id}`)}><VisibilityIcon /></Button></TableCell>

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function AdvancedTable() {
  return (
    <>
      <EnhancedTable />
    </>
  );
}

export default AdvancedTable;
