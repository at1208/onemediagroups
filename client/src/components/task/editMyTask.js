import React from 'react';
import {  Grid,
          Button,
          Box,
          TextField,
          Dialog,
          DialogActions,
          Typography,
          Select,
          FormControl,
          InputLabel,
          MenuItem,
          DialogContent,
          DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getProjects } from '../../actions/project';
import { getEmployee, checkModulePermission } from '../../actions/employee';
import { updateMyTask } from '../../actions/task';
import { isAuth, getCookie } from '../../actions/auth';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  Edit as EditIcon
} from "@material-ui/icons";
import DeleteTask from './deleteTask';
import { ToastContainer, toast } from 'react-toastify';


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

  formControl: {
      // margin: theme.spacing(1),
      minWidth: 120,
      width:"100%"
    },
}));


const EditMyTask = ({ editTask, reload }) => {
  const classes = useStyles();
  const [projects, setProjects] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [updatetaskCheck, setUpdateTaskCheck] = React.useState(false);
  const [reloadAPI, setReloadAPI] = React.useState(false)
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
     status:"",
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
      status:editTask.status,
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

  React.useEffect(() => {
    (async () => {
      let taskModulePermission =  await checkModulePermission('task', 'update', token);
      setUpdateTaskCheck(taskModulePermission)
    })()
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
     updateMyTask(editTask._id, task, token)
       .then((value) => {
         toast.success(value.message)
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
           isLoading:false
         })
         setReloadAPI(!reloadAPI)
         reload(reloadAPI)
         handleClose()
       })
       .catch((err) => {
         toast.error(err.error)
         setTask({...task,
           error:err.error,
           success:"",
           isLoading:false})
       })
  }

    return  <>
             <ToastContainer />
             <Grid container justify="center">
             <Box>
               <IconButton aria-label="details"   onClick={handleClickOpen}>
                 <EditIcon />
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
              <Typography variant="h6">Update Task</Typography>
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
                       <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={task.status}
                          onChange={(e) => setTask({...task, status: e.target.value })}
                          label="Status"
                        >
                          <MenuItem value={'Open'}>Open</MenuItem>
                          <MenuItem value={'Blog Review'}>Blog Review</MenuItem>
                          <MenuItem value={'Done'}>Done</MenuItem>
                          <MenuItem value={'Closed'}>Closed</MenuItem>
                        </Select>
                      </FormControl>
                       </Grid>
                       <Grid item xs={12} sm={12} md={12}>
                         <Autocomplete
                            defaultValue={task.project_id}
                            onChange={(e, val) => {
                               if(val){
                                 setTask({...task, project_id: val._id })
                               }
                             }}
                             disabled={!updatetaskCheck}
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
                            disabled={!updatetaskCheck}
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
                            disabled={!updatetaskCheck}
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


              <Grid container justify="center">
                <Box p={1}>
                  <DeleteTask id={editTask._id} />
                </Box>
                <Box p={1}>
                <Button
                  size="large"
                  variant="contained"
                  className={classes.button}
                  type="submit">
                  Submit
                </Button>
                </Box>
              </Grid>
              </DialogActions>
             </form>
            </div>
            </Dialog>
            </>
}

export default EditMyTask;
