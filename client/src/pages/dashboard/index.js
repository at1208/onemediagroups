import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Card, Typography } from '@material-ui/core';


const Dashboard = () => {
  return <>
          <DashboardLayout>
            <Grid container justify="flex-start" spacing={3}>
              <Grid item sm={4} xs={12} md={4}>
                <Card>
                  <Typography variant="h6" align="center">
                    Projects
                  </Typography>
                </Card>
              </Grid>
              <Grid item sm={4} xs={12} md={4}>
                <Card>
                <Typography variant="h6" align="center">
                  Tasks
                </Typography>
                </Card>
              </Grid>
              <Grid item sm={4} xs={12} md={4}>
                <Card>
                <Typography variant="h6" align="center">
                  Employees
                </Typography>
                </Card>
              </Grid>
               
            </Grid>
          </DashboardLayout>
         </>
}

export default Dashboard;
