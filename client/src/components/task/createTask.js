import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Button, Card, TextField,Dialog,
DialogActions,
DialogContent,
DialogContentText,
DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';
import { getProjects } from '../../actions/project';
import { getEmployee } from '../../actions/employee';
import { createTask } from '../../actions/task';
import { isAuth } from '../../actions/auth';
import Alert from '@material-ui/lab/Alert';

const id = isAuth() && isAuth()._id;



const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    padding:"10px",

  },
  button:{
    textTransform: "none",
    backgroundColor:"#3f51b5",
    // width:"200px",
    color:"white",
    fontWeight:800,
    fontSize:"15px",
    '&:hover': {
              backgroundColor:"#3f51b5"
        },
  }
}));


const ChannelForm = ({  }) => {
  const classes = useStyles();
  const [projects, setProjects] = React.useState([]);
  const [openForm, setOpenForm] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
   setOpen(true);
  };


  const handleClose = () => {
   setOpen(false);
  };

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

    return  <>
             <Grid container justify="center">
               <Button
                variant="contained"
                className={classes.button}
                onClick={handleClickOpen}
                color="primary"
                >
                 Create Task
               </Button>
             </Grid>
             <Dialog open={open} onClose={handleClose} >
             <div className={classes.dialogRoot}>
              <form onSubmit={handleSubmit}>
              <DialogContent>
              <Grid container justify="center" spacing={3}>
                <Grid item sm={12} md={12} xs={12}>
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
                         fullWidth
                         onChange={handleChange("deadline")}
                         defaultValue={null}
                         className={classes.textField}
                         InputLabelProps={{
                           shrink: true,
                         }} />
                       </Grid>

                     </Grid>
                     </form>
                  </Card>
                </Grid>
              </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  className={classes.button}
                  type="submit">
                  Submit
                </Button>
              </DialogActions>
             </form>
            </div>
            </Dialog>
            </>
}

export default ChannelForm;
