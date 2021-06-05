import React from 'react';
import { withRouter } from 'react-router-dom';
import DashboardLayout from '../../components/layout/dashboardLayout';
import UserList from '../../components/chat/userList';
import { Grid } from '@material-ui/core';

const Chats = ({ match: { url } }) => {
      const [receiverSocket, setReceiverSocket] = React.useState();
      const [onlineUsersList, setOnlineUsersList] = React.useState();

  return <>
         <DashboardLayout>
           <Grid container justify="flex-start">
             <Grid item>
               <UserList
                 url={url}
                 getOnlineUsers={(users) => setOnlineUsersList(users)}
                 />
             </Grid>
           </Grid>
         </DashboardLayout>
         </>
}

export default withRouter(Chats);
