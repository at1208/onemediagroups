import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import  DashboardInfo from '../../components/dashboard/dashboardInfo';
import { Divider} from '@material-ui/core';

const Dashboard = () => {
  return <>
          <DashboardLayout>
             <DashboardInfo />
             
          </DashboardLayout>
         </>
}

export default Dashboard;
