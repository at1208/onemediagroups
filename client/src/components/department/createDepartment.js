import React from 'react';
import { Button,
         TextField,
         Grid,
         Dialog,
         DialogActions,
         DialogContent,
         DialogContentText,
         DialogTitle } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from '@material-ui/core/Card';
import { createDesignation } from '../../actions/designation';
import CancelIcon from '@material-ui/icons/Cancel';
import { createDepartment } from '../../actions/department';

import { getEmployee } from '../../actions/employee';
import { isAuth } from '../../actions/auth';
import { createChannel } from '../../actions/channel';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
// import { createChannelChat } from '../../actions/channelchat';
const id = isAuth() && isAuth()._id;


const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    padding:" "
  },
  cardRoot:{
    minHeight:"100px",
    padding:""
  },
  close:{
    position:"absolute",
    right:'5%'
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



const CreateDepartment = ({  }) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [openForm, setOpenForm] = React.useState(false);
    const [department, setDepartment] = React.useState({
       departmentName: "",
       isLoading:false,
       success:"",
       error:""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setDepartment({...department, isLoading:true})
        createDepartment(department)
          .then(res => {
            setDepartment({...department, isLoading:false, success:res.message, error:"", departmentName:"" })
          })
          .catch((err) => {
            setDepartment({...department, isLoading:false, error: err.error, success:"" })
          })
    }

    const handleChange = (e) => {
        setDepartment({...department, departmentName:e.target.value})
    }


  const handleClickOpen = () => {
   setOpen(true);
  };


  const handleClose = () => {
   setOpen(false);
  };

    return  <>
             <Grid container justify="center">
               <Button
                variant="contained"
                className={classes.button}
                onClick={handleClickOpen}
                color="primary"
                >
                  Create Department
               </Button>
             </Grid>
             <Dialog open={open} onClose={handleClose} >
             <div className={classes.dialogRoot}>
             <form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={3} justify="center">
                  <Grid item md={12} xm={12} sm={12}>
                  {department.success && <Alert severity="success">{department.success}</Alert>}
                  {department.error && <Alert severity="error">{department.error}</Alert>}
                  <br />
                  <TextField
                  size="small"
                  onChange={handleChange}
                  value={department.departmentName}
                  label="Department name"
                  variant="outlined"
                  fullWidth/>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </DialogActions>
              </form>
            </div>
            </Dialog>
            </>
}

export default CreateDepartment;
