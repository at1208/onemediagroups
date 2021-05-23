import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getEmployee } from '../../actions/employee';
import ProjectList from './projectList';
import CreateProject from '../../components/project/createProject';
import EditProject from '../../components/project/editProject';
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
   // const [employees, setEmployees] = React.useState([]);
   const [edit, setEdit] = useState({
     open: false,
     project:""
   });

   // React.useEffect(() => {
   //     getEmployee()
   //       .then((value) => {
   //         setEmployees(value.employees)
   //       })
   //       .catch((err) => {
   //         console.log(err)
   //       })
   // }, [])

  return <>
          <DashboardLayout>
            <Grid container justify="space-between">
               <Grid item  md={9} sm={9} xs={12}>
                 <Box pl={3}>
                   <Typography variant="h5">
                      Projects
                   </Typography>
                 </Box>
               </Grid>
               <Grid item  md={3} sm={3} xs={12}>
                 <CreateProject />
               </Grid>
            </Grid>
            <br />
            <ProjectList edit={(value) => setEdit({...edit, open: true, project: value })}/>
            <EditProject editProject={edit.project} status={status => setEdit({...edit, open: status })} modal={edit.open}/>
          </DashboardLayout>
         </>
}

export default Project;
