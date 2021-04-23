import React from 'react';
import DashboardLayout from '../layout/dashboardLayout';
import { Grid, Button, Card, TextField, Dialog,
DialogActions,
DialogContent,
DialogContentText,
DialogTitle} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';
import { createProject } from '../../actions/project';
import { getEmployee } from '../../actions/employee';
import Alert from '@material-ui/lab/Alert';




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
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [openForm, setOpenForm] = React.useState(false);
  const classes = useStyles();
  const [project, setProject] = React.useState({
     name:"",
     description:"",
     team_leader:"",
     team_members:"",
     start_date:"",
     end_date:"",
     error:"",
     success:"",
     isLoading:false
  })


  const handleClickOpen = () => {
   setOpen(true);
  };


  const handleClose = () => {
   setOpen(false);
  };

  React.useEffect(() => {
      getEmployee()
        .then((value) => {
          setEmployees(value.employees)
        })
        .catch((err) => {
          console.log(err)
        })
  }, [])



  const priority = [
    { title: "High" },
    { title: "Low" },
  ]

  const handleChange = type => e => {
      switch (type) {
         case "name":
           setProject({...project, name: e.target.value })
           break;
         case "description":
              setProject({...project, description: e.target.value })
           break;
         case "start_date":
              setProject({...project, start_date: e.target.value })
           break;
         case "end_date":
              setProject({...project, end_date: e.target.value })
           break;
         case "priority":
               setProject({...project, priority: e.target.value })
            break;
        default:

      }
  }

  const handleSubmit = (e) => {
     e.preventDefault();
     setProject({ ...project,
       isLoading:true,
     })
     createProject(project)
       .then((value) => {
         setProject({ ...project,
           name:"",
           description:"",
           team_leader:"",
           team_members:"",
           start_date:"",
           end_date:"",
           success:value.message,
           error:""
         })
       })
       .catch((err) => {
         setProject({ ...project,
           success:"",
           isLoading:false,
           error:err.error
         })
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
                 Create Project
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
                      {project.success && <Alert severity="success">{project.success}</Alert>}
                      {project.error && <Alert severity="error">{project.error}</Alert>}
                     </div>
                     <br />

                       <Grid container spacing={3}>
                         <Grid item xs={12} sm={12} md={12}>
                           <TextField
                            fullWidth
                            size="small"
                            onChange={handleChange("name")}
                            variant="outlined"
                            label="Project name" />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12}>
                           <TextField
                            fullWidth
                            size="small"
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
                                   setProject({...project, team_leader: val._id })
                                 }
                               }}
                              options={employees}
                              size="small"
                              getOptionLabel={(option) => option.first_name + " " + option.last_name}
                              style={{ width: "100%" }}
                              renderInput={(params) => <TextField {...params} label="Team leader" variant="outlined" />}
                            />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12}>
                           <Autocomplete
                             multiple
                             size="small"
                              onChange={(e, val) => {
                                if(val){
                                  let filterValue = val.map((member, i) => {
                                    return member._id
                                  })
                                  setProject({...project, team_members: filterValue });
                                }
                               }}
                              options={employees}
                              getOptionLabel={(option) => option.first_name + " " + option.last_name}
                              style={{ width: "100%" }}
                              renderInput={(params) => <TextField {...params} label="Team members" variant="outlined" />}
                            />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12}>
                         <TextField
                           variant="outlined"
                           size="small"
                           id="date"
                           label="Start date"
                           type="date"
                           fullWidth
                           onChange={handleChange("start_date")}
                           defaultValue={null}
                           className={classes.textField}
                           InputLabelProps={{
                             shrink: true,
                           }} />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12}>
                         <TextField
                           variant="outlined"
                           size="small"
                           id="date"
                           fullWidth
                           label="End date"
                           type="date"
                           onChange={handleChange("end_date")}
                           defaultValue={null}
                           className={classes.textField}
                           InputLabelProps={{
                             shrink: true,
                           }} />
                         </Grid>
                         </Grid>
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
