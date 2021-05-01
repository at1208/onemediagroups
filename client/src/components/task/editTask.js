import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import {  Grid,
          Button,
          Box,
          Card,
          TextField,
          Dialog,
          DialogActions,
          Typography,
          DialogContent,
          DialogContentText,
          DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';
import { getProjects } from '../../actions/project';
import { getEmployee } from '../../actions/employee';
import { updateTask } from '../../actions/task';
import { createTask } from '../../actions/task';
import { isAuth, getCookie } from '../../actions/auth';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";
import DeleteTask from './deleteTask';

const id = isAuth() && isAuth()._id;



const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    // padding:"10px",
  },
  button:{
    textTransform: "none",
    backgroundColor:"#3f51b5",
    // width:"200px",
    color:"white",
    fontWeight:400,
    fontSize:"15px",
    '&:hover': {
              backgroundColor:"#3f51b5"
        },
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));


const EditTask = ({ editTask }) => {
  const classes = useStyles();
  const [projects, setProjects] = React.useState([]);
  const [openForm, setOpenForm] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const token = getCookie("token")



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
    getProjects(token)
      .then((value) => {
        setProjects(value.projects)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  React.useEffect(() => {
    setTask({...task,
      title:editTask.title,
      description:editTask.description,
      project_id: editTask.project_id,
      assignee: editTask.assignee,
      follower:editTask.follower })
  }, [open])

  React.useEffect(() => {
      getEmployee(token)
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
     updateTask(editTask._id, task, token)
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
             <Box>
               <IconButton aria-label="details"   onClick={handleClickOpen}>
                 <RemoveRedEyeIcon />
               </IconButton>
             </Box>
             </Grid>
             <Dialog open={open} onClose={handleClose} disableBackdropClick>
             <div className={classes.dialogRoot}>
              <form onSubmit={handleSubmit}>
              <DialogContent>
              <DialogTitle
               id="customized-dialog-title"
               onClose={handleClose}
               disableTypography
               className={classes.root}>
              <Typography variant="h6">Create a new task</Typography>
                {open ? (
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    className={classes.closeButton}>
                    <CloseIcon />
                  </IconButton>
                ) : null}
              </DialogTitle>
              <Grid container justify="center" spacing={3}>
                <Grid item sm={12} md={12} xs={12}>
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
                          value={task.title}
                          onChange={handleChange("title")}
                          variant="outlined"
                          label="Title" />
                       </Grid>
                       <Grid item xs={12} sm={12} md={12}>
                         <TextField
                          fullWidth
                          multiline
                          rows={3}
                          onChange={handleChange("description")}
                          value={task.description}
                          variant="outlined"
                          label="Description" />
                       </Grid>
                       <Grid item xs={12} sm={12} md={12}>
                         <Autocomplete
                            defaultValue={task.project_id}
                            onChange={(e, val) => {
                               if(val){
                                 setTask({...task, project_id: val._id })
                               }
                             }}
                            options={projects}
                            getOptionLabel={(option) => option.name}
                            style={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Project" variant="outlined" />}
                          />
                       </Grid>
                       <Grid item xs={12} sm={12} md={12}>
                         <Autocomplete
                            defaultValue={task.assignee}
                            onChange={(e, val) => {
                               if(val){
                                 setTask({...task, assignee: val._id })
                               }
                             }}
                            options={employees}
                            getOptionLabel={(option) => option.full_name}
                            style={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Assignee" variant="outlined" />}
                          />
                       </Grid>
                       <Grid item xs={12} sm={12} md={12}>
                        {<Autocomplete
                            defaultValue={task.follower}
                            onChange={(e, val) => {
                                if(val){
                                  let filterValue = val.map((member, i) => {
                                    return member._id
                                  })
                                  setTask({...task, follower: filterValue });
                                }
                             }}
                            options={employees}
                            getOptionLabel={(option) => option.full_name}
                            style={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Reporter" variant="outlined" />}
                          />}
                       </Grid>
                       {/*<Grid item xs={12} sm={12} md={12}>
                       <TextField
                         variant="outlined"
                         id="date"
                         label="Deadline"
                         type="date"
                         fullWidth
                         onChange={handleChange("deadline")}

                         className={classes.textField}
                         InputLabelProps={{
                           shrink: true,
                         }} />
                       </Grid>*/}

                     </Grid>
                     </form>

                </Grid>
              </Grid>
              </DialogContent>
              <DialogActions>
                <DeleteTask id={editTask._id} />
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

export default EditTask;
