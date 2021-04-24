import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Card,Button, Typography, Box, CardContent, CardActions } from '@material-ui/core';




const Dashboard = () => {
  return <>
          <DashboardLayout>
            <Grid container justify="flex-start" spacing={3}>
              <Grid item sm={3} xs={12} md={3}>
                <Card>
                  <Typography variant="body1" align="center">
                    Projects
                  </Typography>
                  <Typography variant="h4" align="center">
                     61
                  </Typography>
                </Card>
              </Grid>
              <Grid item sm={3} xs={12} md={3}>
                <Card>
                <Typography variant="body1" align="center">
                  Tasks
                </Typography>
                <Typography variant="h4" align="center">
                   78
                </Typography>
                </Card>
              </Grid>

              <Grid item sm={3} xs={12} md={3}>
                <Card>
                <Typography variant="body1" align="center">
                  Blogs
                </Typography>
                <Typography variant="h4" align="center">
                   90
                </Typography>
                </Card>
              </Grid>
              <Grid item sm={3} xs={12} md={3}>
                <Card>
                <Typography variant="body1" align="center">
                  Users
                </Typography>
                <Typography variant="h4" align="center">
                   101
                </Typography>
                </Card>
              </Grid>

            </Grid>
          </DashboardLayout>
         </>
}

export default Dashboard;
