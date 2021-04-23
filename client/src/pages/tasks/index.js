import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Button, Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';
import { getProjects } from '../../actions/project';
import { getEmployee } from '../../actions/employee';
import { createTask } from '../../actions/task';
import { isAuth } from '../../actions/auth';
import Alert from '@material-ui/lab/Alert';
import TaskList from './taskList';
import CreateTask from '../../components/task/createTask';



const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"20px 10px 20px 10px"
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
   }
}));
const Tasks = () => {
   const classes = useStyles();



function Task() {
  return <>
          <Grid container spacing={3} justify="flex-end">
            <Grid item  md={3} sm={3} xs={12}>
               <CreateTask />
            </Grid>
          </Grid>
          <br />
          <TaskList />
         </>
   }


  return <>
          <DashboardLayout>
             <Task />
          </DashboardLayout>
         </>
}

export default Tasks;
