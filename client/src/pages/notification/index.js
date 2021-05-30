import React from 'react';
import NotificationList from '../../components/notification/list';
import DashboardLayout from '../../components/layout/dashboardLayout';

import { Grid, Typography, Box  } from '@material-ui/core';

const Notification = () => {
  return <>
          <DashboardLayout>
             <Grid container>
               <Grid item xs={12} sm={9} md={9} lg={9}>
                 <Box pt={2}>
                 <Typography variant="h4">

                 </Typography>
                 </Box>

               </Grid>

               <Grid item xs={12} sm={3} md={3} lg={3}>

               </Grid>
             </Grid>

           <NotificationList />
          </DashboardLayout>
         </>
}
export default Notification;
