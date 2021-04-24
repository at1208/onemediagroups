import React from 'react';
import { Button,
         TextField,
         Grid,
         Avatar,
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
import { AvatarGroup as MuiAvatarGroup } from "@material-ui/lab";
import Alert from '@material-ui/lab/Alert';
import styled from "styled-components/macro";

// import { createChannelChat } from '../../actions/channelchat';
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

const AvatarGroup = styled(MuiAvatarGroup)`
  margin-left: 10px;
`;

const ChannelForm = ({ pageReload, members }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [reload, setReload] = React.useState(false);


  const handleClickOpen = () => {
   setOpen(true);
  };

  React.useEffect(() => {

  }, [])

  React.useEffect(() => {
    pageReload(reload)
  }, [reload])

  const handleClose = () => {
   setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  const handleChange = (e) => {

  }

 
    return  <>
             <Grid container justify="center">
             <AvatarGroup max={3} onClick={handleClickOpen}>
               <Avatar alt="Avatar" src="/static/img/avatars/avatar-1.jpg" />
               <Avatar alt="Avatar" src="/static/img/avatars/avatar-2.jpg" />
               <Avatar alt="Avatar" src="/static/img/avatars/avatar-3.jpg" />
             </AvatarGroup>

             </Grid>
             <Dialog open={open} onClose={handleClose} >
             <div className={classes.dialogRoot}>

             <form onSubmit={handleSubmit}>

              <DialogContent>

              </DialogContent>

              </form>
            </div>
            </Dialog>
            </>
}

export default ChannelForm;
