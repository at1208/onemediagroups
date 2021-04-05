import React from "react";
import { NavLink } from "react-router-dom";
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
import { getEmployee } from '../../actions/employee';
import moment from 'moment';




const headCells = [
    { id: "employee_id", numeric: false, disablePadding: false, label: "Employee ID" },
    { id: "employee_name", numeric: false, disablePadding: true, label: "Employee Name" },
    { id: "department", numeric: false, disablePadding: false, label: "Department" },
    { id: "designation", numeric: false, disablePadding: false, label: "Designation" },
    { id: "status", numeric: false, disablePadding: false, label: "Status" },
    { id: "date_of_joining", numeric: false, disablePadding: false, label: "Date Of Join" },
    { id: "date_of_joining", numeric: false, disablePadding: false, label: "View" },
    { id: "actions", numeric: false, disablePadding: false, label: "Action" },
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
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [showEmployee, setShowEmployee] = React.useState(false);

  React.useEffect(() => {
     getEmployee()
       .then( response => {
         if(response && response.employees){
           let employeeData = response.employees.map((item) => {
             let { first_name, last_name, employee_id, status, designation, department, date_of_joining} = item;
             return {
                employee_name: first_name + " " + last_name,
                employee_id,
                status,
                designation: designation.designation_name,
                department: department.department_name,
                date_of_joining
             }
           })
           setRows(employeeData)
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
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.employee_name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.employee_name}

                    >
                      <TableCell padding="checkbox">

                      </TableCell>

                      <TableCell align="left">{row.employee_id}</TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.employee_name}
                      </TableCell>
                      <TableCell align="left">{row.department}</TableCell>
                      <TableCell align="left">{row.designation}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="left">{  moment(row.date_of_joining).format('Do MMMM  YYYY')}</TableCell>
                      <TableCell align="left"> <Button onClick={() => setShowEmployee(true)}><VisibilityIcon /></Button></TableCell>
                      <TableCell align="left" ><MoreVertIcon /></TableCell>
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
