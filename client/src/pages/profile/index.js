import React from 'react';
import MyProfile from '../../components/profile/profile';
import DashboardLayout from '../../components/layout/dashboardLayout';

const Profile = () => {
  return <>
          <DashboardLayout>
            <MyProfile />
          </DashboardLayout>
         </>
}
export default Profile;
