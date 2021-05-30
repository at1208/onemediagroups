import React, { useEffect, useState } from 'react';
import { allNotifications } from '../../actions/notification';
import { getCookie } from '../../actions/auth';
import {
 ListItem,
 ListItemText,
 Typography
} from "@material-ui/core";

const NotificationList = () => {
  const token = getCookie("token");
  const [notifyList, setNotifyList] = useState([]);

  useEffect(() => {
    (async () => {
    let notify = await allNotifications(token);
      setNotifyList(notify)
    })()
  }, [])


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
           </ListItem>
           <Typography variant="body2">

           </Typography>
           </>
    })
  }else {
    return <>
           </>
  }

}


  return <>
        {list()}
         </>
}

export default NotificationList;
