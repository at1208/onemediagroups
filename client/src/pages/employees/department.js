import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { createDepartment } from '../../actions/department';
import Alert from '@material-ui/lab/Alert';
 
import CancelIcon from '@material-ui/icons/Cancel';


const useStyles = makeStyles((theme) => ({
   cardRoot:{
     minHeight:"100px",
     padding:"30px 30px 30px 30px"
   },
   close:{
     position:"absolute",
     right:'5%'
   }
}));



const AddDepartment = () => {
    const classes = useStyles();
    const [openForm, setOpenForm] = React.useState(false);
    const [department, setDepartment] = React.useState({
       departmentName: "",
       isLoading:false,
       success:"",
       error:""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setDepartment({...department, isLoading:true})
        createDepartment(department)
          .then(res => {
            setDepartment({...department, isLoading:false, success:res.message, error:"", departmentName:"" })
          })
          .catch((err) => {
            setDepartment({...department, isLoading:false, error: err.error, success:"" })
          })
    }

    const handleChange = (e) => {
        setDepartment({...department, departmentName:e.target.value})
    }

if(!openForm){
  return   <Grid container justify="flex-end" >
             <Grid item xs={12} sm={4} md={4}>
              <Button
                 variant="contained"
                 color="primary"
                 onClick={() => setOpenForm(true)}
                 fullWidth>
                 Add Department
              </Button>
             </Grid>
          </Grid>
} else{
  return <>

          <Grid container justify="flex-end" >
             <Grid item xs={12} sm={4} md={4}>
              <Button
                 variant="contained"
                 color="primary"
                 onClick={() => setOpenForm(false)}
                 className={classes.close}
                  >
                 <CancelIcon />
              </Button>
             </Grid>
          </Grid>
          <br /><br />
          <Grid container spacing={3} justify="center">
            <Grid item md={6} xm={6} sm={6}>
               <Card className={classes.cardRoot} variant="outlined">
                 {department.success && <Alert severity="success">{department.success}</Alert>}
                 {department.error && <Alert severity="error">{department.error}</Alert>}

                  <br />
                  <form onSubmit={handleSubmit}>
                    <Grid container justify="center" key={1}>
                     <TextField
                      onChange={handleChange}
                      value={department.departmentName}
                      label="Department name"
                      variant="outlined"
                      fullWidth/>
                    </Grid>
                    <br />
                    <Grid container justify="center" key={2}>
                      <Grid item xs={12} md={5}>
                        <Button
                        type="submit"
                        variant="contained"
                        fullWidth color="primary"
                        disabled={department.isLoading}>Submit</Button>
                      </Grid>
                    </Grid>
                  </form>
               </Card>
            </Grid>
          </Grid>

         </>
  }
}
const Department = () => {
  return <>
          <DashboardLayout>
             {AddDepartment()}
          </DashboardLayout>
         </>
}

export default Department;
