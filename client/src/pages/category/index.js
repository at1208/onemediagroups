import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Typography, Box } from '@material-ui/core';
import CreateCategory from '../../components/category/createCategory';

const Categories = () => {
  return <>
            <DashboardLayout>
            <Grid container justify="space-between">
               <Grid item  md={9} sm={9} xs={12}>
                 <Box pl={3}>
                   <Typography variant="h5">
                      Categories
                   </Typography>
                 </Box>
               </Grid>
               <Grid item  md={3} sm={3} xs={12}>
                 <CreateCategory />
               </Grid>
            </Grid>
            </DashboardLayout>
         </>
}

export default Categories;
