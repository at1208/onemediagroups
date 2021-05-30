import React from 'react';
import {  Grid,
          Button,
          TextField,
          Dialog,
          DialogActions,
          Typography,
          DialogContent,
          DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getProjects } from '../../actions/project';
import { getEmployee } from '../../actions/employee';
import { createTask } from '../../actions/task';
import { isAuth, getCookie } from '../../actions/auth';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
}));


const CreateTask = ({ reload }) => {
  const classes = useStyles();
  const [projects, setProjects] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
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
     description:"",
     project_id:"",
     assignee:"",
     follower:"",
     deadline:"",
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

  const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       setTask({...task, isLoading: true })
       let response = await createTask(task, token);

       toast.success(response.message)
       setTask({...task,
         title:"",
         owner: "",
         description:"",
         project_id:"",
         assignee:"",
         follower:"",
         deadline:"",
         error:"",
         success:"",
         isLoading:false
       })
        setReloadAPI(!reloadAPI)
        reload(reloadAPI)
        handleClose()
     } catch (err) {
       toast.error(err.error)

       setTask({...task,
         isLoading:false})
     }
  }

    return  <>
            <ToastContainer />
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
                    className={classes.closeButton}
                  >
                    <CloseIcon />
                  </IconButton>
                ) : null}
              </DialogTitle>
              <Grid container justify="center" spacing={3}>
                <Grid item sm={12} md={12} xs={12}>
                   <form onSubmit={handleSubmit}>
                     <Grid container spacing={3}>
                       <Grid item xs={12} sm={12} md={12}>
                         <TextField
                          fullWidth
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
                                  // let filterValue = val.map((member, i) => {
                                  //   return member._id
                                  // })
                                  setTask({...task, follower: val._id });
                                }
                             }}
                            options={employees}
                            getOptionLabel={(option) => option.first_name + " " + option.last_name}
                            style={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Reporter" variant="outlined" />}
                          />
                       </Grid>
                       {/*<Grid item xs={12} sm={12} md={12}>
                       <TextField
                         variant="outlined"
                         id="date"
                         label="Deadline"
                         type="date"
                         fullWidth
                         onChange={handleChange("deadline")}
                         defaultValue={null}
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

                <Button
                  size="large"
                  variant="contained"
                  className={classes.button}
                  type="submit">
                  {task.isLoading?"Submitting...":"Submit"}
                </Button>
              </DialogActions>
             </form>
            </div>
            </Dialog>
            </>
}

export default CreateTask;
