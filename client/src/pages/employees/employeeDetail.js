import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { getSingleEmployee } from '../../actions/employee';
import { Grid, TextField, Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"40px 10px 40px 10px"
   },
   button:{
     textTransform: "none",
     backgroundColor:"#3f51b5",
     width:"100%",
     color:"white",
     fontWeight:800,
     height:"40px",
     fontSize:"15px",
     '&:hover': {
               backgroundColor:"#3f51b5"
         },
   },
}));


 const EmployeeDetail = ({ match: { params: id } }) => {
   const history = useHistory();
   const [detail, setDetails] = React.useState(null);
   const classes = useStyles();

   React.useEffect(() => {
        getSingleEmployee(id.id)
          .then((value) => {
            if(value){
               setDetails(value.employees)
            }
          })
          .catch((err) => {
            console.log(err)
          })
   }, []);

  if(detail){
    return <>
             <DashboardLayout>
               <Grid container justify="flex-start">
                  <Grid item sm={1} md={1} xs={12}>
                    <Button
                      fullWidth
                      className={classes.button}
                      onClick={() => history.push("/all-employees")}
                      variant="contained">Back</Button>
                  </Grid>
               </Grid>
               <br /><br />
               <Card className={classes.cardRoot}>
                 <Grid container justify="center" spacing={2}>
                   <Grid item sm={6} xs={12} md={6}>
                      <TextField

                      variant="outlined"
                      value={detail.first_name + " " + detail.last_name}
                      label="Employee Name"
                      fullWidth/>
                   </Grid>
                   <Grid item sm={6} xs={12} md={6}>
                      <TextField

                      variant="outlined"
                      value={detail.email}
                      label="Email"
                      fullWidth/>
                   </Grid>
                   <Grid item sm={6} xs={12} md={6}>
                      <TextField

                      variant="outlined"
                      value={detail.gender}
                      label="Gender"
                      fullWidth/>
                   </Grid>
                   <Grid item sm={6} xs={12} md={6}>
                   <Autocomplete

                      onChange={(event, newValue) => {
                        if(newValue){
                          // setEmployee({...employee, department: newValue._id});
                        }
                       }}
                      defaultValue={detail.department}
                      renderTags={(val,e) => console.log(val, e)}
                      options={""}
                      getOptionLabel={(option) => option.department_name}
                      style={{ width: "100%" }}
                      renderInput={(params) => <TextField {...params} label="Department" variant="outlined"  />}
                    />
                   </Grid>
                   <Grid item sm={6} xs={12} md={6}>
                       <Autocomplete

                          onChange={(event, newValue) => {
                            if(newValue){
                              // setEmployee({...employee, department: newValue._id});
                            }
                           }}
                          defaultValue={detail.designation}
                          renderTags={(val,e) => console.log(val, e)}
                          options={""}
                          getOptionLabel={(option) => option.designation_name}
                          style={{ width: "100%" }}
                          renderInput={(params) => <TextField {...params} label="Designation" variant="outlined"  />}
                        />
                   </Grid>
                   <Grid item sm={6} xs={12} md={6}>
                      <TextField

                      variant="outlined"
                      label="Role"
                      value={detail.role}
                      fullWidth/>
                   </Grid>
                   <Grid item sm={6} xs={12} md={6}>
                      <TextField

                      variant="outlined"
                      value={detail.address}
                      label="Address"
                      fullWidth/>
                   </Grid>
                   <Grid item sm={6} xs={12} md={6}>
                      <TextField

                      variant="outlined"
                      value={detail.phone_number}
                      label="Phone number"
                      fullWidth/>
                   </Grid>
                   <Grid item sm={6} xs={12} md={6}>
                      <TextField

                      variant="outlined"
                      value={detail.status}
                      label="Status"
                      fullWidth/>
                   </Grid>
                   <Grid item sm={6} xs={12} md={6}>
                      <TextField

                      variant="outlined"
                      value={detail.date_of_joining}
                      label="Date of join"
                      fullWidth/>
                   </Grid>
                 </Grid>
               </Card>
             </DashboardLayout>
           </>
  }else{
    return <DashboardLayout>
           </DashboardLayout>
  }
}

export default withRouter(EmployeeDetail);
