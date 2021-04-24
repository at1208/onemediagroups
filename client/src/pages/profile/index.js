import React from 'react';
import MyProfile from '../../components/profile/profile';
import DashboardLayout from '../../components/layout/dashboardLayout';
import UpdateProfile from '../../components/profile/updateProfile';
import { Grid  } from '@material-ui/core';

const Profile = () => {
  return <>
          <DashboardLayout>
             <Grid container>
               <Grid item xs={12} sm={9} md={9} lg={9}>
               </Grid>

               <Grid item xs={12} sm={3} md={3} lg={3}>
                 <UpdateProfile />
               </Grid>
             </Grid>
             <br/>
            <MyProfile />
          </DashboardLayout>
         </>
}
export default Profile;
