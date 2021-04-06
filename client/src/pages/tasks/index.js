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
const id = isAuth() && isAuth()._id;

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
   const [projects, setProjects] = React.useState([]);
   const [employees, setEmployees] = React.useState([]);

   const [task, setTask] = React.useState({
      title:"",
      owner:id,
      description:"",
      project_id:"",
      assignee:"",
      follower:"",
      deadline:"",
      error:"",
      success:"",
      isLoading:false
   })


   React.useEffect(() => {
     getProjects()
       .then((value) => {
         setProjects(value.projects)
       })
       .catch((err) => {
         console.log(err)
       })
   }, [])

   React.useEffect(() => {
       getEmployee()
         .then((value) => {
           setEmployees(value.employees)
         })
         .catch((err) => {
           console.log(err)
         })
   }, [])


   const handleChange = type => e => {
       switch (type) {
          case "title":
            setTask({...task, title: e.target.value })
            break;
          case "description":
               setTask({...task, description: e.target.value })
            break;
          case "deadline":
               setTask({...task, deadline: e.target.value })
            break;
         default:

       }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      setTask({...task, isLoading: true })
      createTask(task)
        .then((value) => {
          setTask({...task,
            title:"",
            owner: "",
            description:"",
            project_id:"",
            assignee:"",
            follower:"",
            deadline:"",
            error:"",
            success:value.message,
            isLoading:false})
        })
        .catch((err) => {
          setTask({...task,
            error:err.error,
            success:"",
            isLoading:false})
        })
   }

function Task() {
       const [openForm, setOpenForm] = React.useState(false);

       if(!openForm){
         return <>
                 <Grid container spacing={3} justify="flex-end">
                   <Grid item  md={3} sm={3} xs={12}>
                     <Button
                       className={classes.button}
                       onClick={() => setOpenForm(true)}>
                       Create Task
                     </Button>
                   </Grid>
                 </Grid>
                 <br />
                 <TaskList />
                </>
       }else{
  return <>
           <Grid container spacing={3} justify="flex-end">
                 <Grid item  md={4} sm={4} xs={12}>
                   <Button
                    onClick={() => setOpenForm(false)}
                    className={classes.close}
                    color="primary">
                   <CancelIcon />
                   </Button>
                 </Grid>
           </Grid>
           <br />
           <Grid container justify="center" spacing={3}>
             <Grid item sm={7} md={7} xs={12}>
               <Card className={classes.cardRoot}>
               <div className={classes.errorContainer}>
                {task.success && <Alert severity="success">{task.success}</Alert>}
                {task.error && <Alert severity="error">{task.error}</Alert>}
               </div>
               <br />
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                       fullWidth
                       size="small"
                       onChange={handleChange("title")}
                       variant="outlined"
                       label="Title" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                       fullWidth
                       multiline
                       rows={3}
                       size="small"
                       onChange={handleChange("description")}
                       variant="outlined"
                       label="Description" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Autocomplete
                         onChange={(e, val) => {
                            if(val){
                              setTask({...task, project_id: val._id })
                            }
                          }}
                         size="small"
                         options={projects}
                         getOptionLabel={(option) => option.name}
                         style={{ width: "100%" }}
                         renderInput={(params) => <TextField {...params} label="Project" variant="outlined" />}
                       />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Autocomplete
                         onChange={(e, val) => {
                            if(val){
                              setTask({...task, assignee: val._id })
                            }
                          }}
                         size="small"
                         options={employees}
                         getOptionLabel={(option) => option.first_name + " " + option.last_name}
                         style={{ width: "100%" }}
                         renderInput={(params) => <TextField {...params} label="Assignee" variant="outlined" />}
                       />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Autocomplete
                         onChange={(e, val) => {
                             if(val){
                               let filterValue = val.map((member, i) => {
                                 return member._id
                               })
                               setTask({...task, follower: filterValue });
                             }
                          }}
                         size="small"
                         multiple
                         options={employees}
                         getOptionLabel={(option) => option.first_name + " " + option.last_name}
                         style={{ width: "100%" }}
                         renderInput={(params) => <TextField {...params} label="Follower" variant="outlined" />}
                       />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      variant="outlined"
                      id="date"
                      label="Deadline"
                      type="date"
                      size="small"
                      onChange={handleChange("deadline")}
                      defaultValue={null}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }} />
                    </Grid>
                    <Grid container justify="center">
                      <Grid sm={3} md={3} xs={12}>
                        <br /><br />
                         <Button
                           className={classes.button}
                           type="submit">
                           Submit
                         </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  </form>
               </Card>
             </Grid>
           </Grid>
         </>
       }
   }


  return <>
          <DashboardLayout>
             <Task />
          </DashboardLayout>
         </>
}

export default Tasks;
