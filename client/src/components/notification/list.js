import React, { useEffect, useState } from 'react';
import { allNotifications } from '../../actions/notification';
import { ToastContainer, toast } from 'react-toastify';
import { getCookie } from '../../actions/auth';
import moment from 'moment';
import {
 ListItem,
 ListItemText,
 Typography,
 Grid
} from "@material-ui/core";

const NotificationList = ({ viewAs }) => {
  // viewAs -> true means All notifications(Admin)
  const token = getCookie("token");
  const [notifyList, setNotifyList] = useState([]);

  useEffect(() => {
    allNotifications(token, viewAs)
    .then((value) => {
        setNotifyList(value)
    })
    .catch((err) => {
       toast.error(err.error)
    })
  }, [viewAs])


const list = () => {
  if(notifyList.length>0){
  return notifyList.map((msg, i) => {
      let desc = JSON.parse(msg.description)
      return <>
           <ListItem>
              <ListItemText
                primary={msg.title}
                primaryTypographyProps={{
                  variant: "subtitle2",
                  color: "textPrimary",
                }}
                secondary={desc.description}
              />
              <Typography variant="body2">
               <b>{moment(msg.createdAt).format(" h:mm a, Do MMMM YYYY")}</b>
              </Typography>
           </ListItem>

           </>
    })
  }else {
    return <>
           </>
  }

}


  return <>
          <ToastContainer />
           <Grid container justify="center">
              <Grid item xs={12} sm={10} md={10} lg={10}>
               {list()}
             </Grid>
           </Grid>
         </>
}

export default NotificationList;
