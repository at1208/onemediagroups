import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CreateDesignation from '../../components/designation/createDesignation'
import DesignationList from '../../components/designation/designationList'

const useStyles = makeStyles((theme) => ({

}));

const AddDesignation = () => {
    const classes = useStyles();
    return  <>
           <Grid container justify="flex-end" >
              <Grid item xs={12} sm={3} md={3}>
                 <CreateDesignation  />
              </Grid>
           </Grid>


           </>
}

const Designation = () => {
  return <>
          <DashboardLayout>
             {AddDesignation()}
             <br />
             <DesignationList />
          </DashboardLayout>
         </>
}

export default Designation;
