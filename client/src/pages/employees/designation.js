import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { createDesignation } from '../../actions/designation';
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



const AddDesignation = () => {
    const classes = useStyles();
    const [openForm, setOpenForm] = React.useState(false);

    const [designation, setDesignation] = React.useState({
       designationName: "",
       isLoading:false,
       success:"",
       error:""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setDesignation({...designation, isLoading:true})
        createDesignation(designation)
          .then(res => {
            setDesignation({...designation, isLoading:false, success:res.message, error:"", designationName:"" })
          })
          .catch((err) => {
            setDesignation({...designation, isLoading:false, error: err.error, success:"" })
          })
    }

    const handleChange = (e) => {
        setDesignation({...designation, designationName:e.target.value})
    }

if(!openForm){
   return  <Grid container justify="flex-end" >
             <Grid item xs={12} sm={3} md={3}>
              <Button
                 className={classes.button}
                 onClick={() => setOpenForm(true)}
                  >
                 Add Designation
              </Button>
             </Grid>
          </Grid>
}
  return <>

          <Grid container justify="flex-end" >
             <Grid item xs={12} sm={4} md={4}>
              <Button
                 onClick={() => setOpenForm(false)}
                 className={classes.close}
                 color="primary">
                  <CancelIcon />
              </Button>
             </Grid>
          </Grid>
          <br /><br />
          <Grid container spacing={3} justify="center">
            <Grid item md={6} xm={6} sm={6}>
               <Card className={classes.cardRoot} variant="outlined">
                 {designation.success && <Alert severity="success">{designation.success}</Alert>}
                 {designation.error && <Alert severity="error">{designation.error}</Alert>}

                  <br />
                  <form onSubmit={handleSubmit}>
                    <Grid container justify="center" key={1}>
                     <TextField
                      onChange={handleChange}
                      value={designation.designationName}
                      label="Designation name"
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
                        disabled={designation.isLoading}>Submit</Button>
                      </Grid>
                    </Grid>
                  </form>
               </Card>
            </Grid>
          </Grid>

         </>
}
const Designation = () => {
  return <>
          <DashboardLayout>
             {AddDesignation()}
          </DashboardLayout>
         </>
}

export default Designation;
