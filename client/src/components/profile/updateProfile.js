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
import { getEmployee } from '../../actions/employee';
import { isAuth } from '../../actions/auth';
import { createChannel } from '../../actions/channel';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
const id = isAuth() && isAuth()._id;


const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    padding:"10px"
  },
  button:{
    textTransform: "none",
    backgroundColor:"#3f51b5",
    width:"200px",
    color:"white",
    padding:"10px",
    fontWeight:800,
    height:"40px",
    fontSize:"15px",
    '&:hover': {
              backgroundColor:"#3f51b5"
        },
  }
}));


const ChannelForm = ({ pageReload }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [employees, setEmployees] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [channel, setChannel] = React.useState({
        channel_name:"",
        members:[],
        admins:[],
        error:"",
        success:"",
        isLoading:false
      })

  const handleClickOpen = () => {
   setOpen(true);
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



  const handleClose = () => {
   setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setChannel({...channel, isLoading:true});
    createChannel(channel)
      .then((value) => {
        setChannel({...channel, success:value.message, isLoading:false, channel_name:"", members:[]});
        setOpen(false);

      })
      .catch((err) => {
        setChannel({...channel, isLoading:false, error: err.error});
      })
  }

  const handleChange = (e) => {
      setChannel({...channel, channel_name: e.target.value, admins:[id] })
  }
    return  <>
             <Grid container justify="center">
               <Button
                variant="contained"
                className={classes.button}
                onClick={handleClickOpen}
                color="primary"
                >
                 Update Profile
               </Button>
             </Grid>
             <Dialog open={open} onClose={handleClose} >
             <div className={classes.dialogRoot}>

             <form onSubmit={handleSubmit}>

              <DialogContent>

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

export default ChannelForm;
