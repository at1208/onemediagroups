import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Button, Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';
import { createProject } from '../../actions/project';
import { getEmployee } from '../../actions/employee';
import Alert from '@material-ui/lab/Alert';
import ProjectList from './projectList';
import CreateProject from '../../components/project/createProject';

const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"20px 15px 20px 15px"
   },
   textField:{
     width:"100%",
   },
   close:{
     position:"absolute",
     right:'5%'
   },
   errorContainer:{
     height:"35px"
   },
   button:{
     textTransform: "none",
     backgroundColor:"#3f51b5",
     width:"100%",
     color:"white",
     fontWeight:800,
     height:"40px",
     fontSize:"15px",
     '&:hover': {
               backgroundColor:"#3f51b5"
         },
   },
}));




const Project = () => {
   const classes = useStyles();
   const [employees, setEmployees] = React.useState([]);

   React.useEffect(() => {
       getEmployee()
         .then((value) => {
           setEmployees(value.employees)
         })
         .catch((err) => {
           console.log(err)
         })
   }, [])


   const AddProject = () => {
       return <>
              <Grid container spacing={3} justify="flex-end">
                 <Grid item  md={3} sm={3} xs={12}>
                   <CreateProject />
                 </Grid>
              </Grid>
            </>
   }

  return <>
          <DashboardLayout>
            {AddProject()}
            <ProjectList />
          </DashboardLayout>
         </>
}

export default Project;
