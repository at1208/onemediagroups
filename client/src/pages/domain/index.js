import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Typography, Box } from '@material-ui/core';
import CreateDomain from '../../components/domain/createDomain';

const Domains = () => {
  return <>
            <DashboardLayout>
            <Grid container justify="space-between">
               <Grid item  md={9} sm={9} xs={12}>
                 <Box pl={3}>
                   <Typography variant="h5">
                      Domains
                   </Typography>
                 </Box>
               </Grid>
               <Grid item  md={3} sm={3} xs={12}>
                 <CreateDomain />
               </Grid>
            </Grid>
            </DashboardLayout>
         </>
}

export default Domains;
