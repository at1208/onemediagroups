import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import CreateEmployee from '../../components/employee/createEmployee';
import EmployeeList from '../../components/employee/employeeList';
import EmployeeFilter from '../../components/employee/employeeFilter';
import { Grid} from '@material-ui/core';


const AllEmployees = () => {

 const AddEmployee = () => {
     return <>
            <Grid container spacing={3} justify="flex-end">
               <Grid item  md={3} sm={3} xs={12}>
                 <CreateEmployee />
               </Grid>
            </Grid>
          </>
 }

  return <>
           <DashboardLayout>
              {AddEmployee()}
              <br />
              {/*<EmployeeFilter />*/}
              <br />
              <EmployeeList />
           </DashboardLayout>
         </>
}
export default AllEmployees;
