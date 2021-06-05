import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import DashboardLayout from '../../components/layout/dashboardLayout';
import UserList from '../../components/chat/userList';
import { Grid } from '@material-ui/core';
import ChatBox from '../../components/chat/chatBox';

const PersonalChat = ({ match: { params: id, path, url, params }, location: { state } }) => {
    // const [receiverSocket, setReceiverSocket] = useState(state.receiverSocket.socketId);
    const [onlineUsersList, setOnlineUsersList] = useState([]);



  return <>
         <DashboardLayout>
           <Grid container justify="space-between">
             <Grid item md={9} sm={8} lg={10} xs={12}>
              <ChatBox
                receiverId={id.id}
                onlineUsers={onlineUsersList}
                />
             </Grid>
             <Grid item md={3} sm={4} lg={2} xs={12}>
              <UserList
                getOnlineUsers={(users) => setOnlineUsersList(users)}
                url={url} />
             </Grid>
           </Grid>
         </DashboardLayout>
     </>
}

export default withRouter(PersonalChat);
