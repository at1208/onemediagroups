import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import StyleIcon from '@material-ui/icons/Style';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MuiPhoneNumber from 'material-ui-phone-number';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getDepartments } from '../../actions/department';
import { getDesignations } from '../../actions/designation';
import { createEmployee } from '../../actions/employee';
import { onBoard } from '../../actions/auth';
import Alert from '@material-ui/lab/Alert';
import CancelIcon from '@material-ui/icons/Cancel';


const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"30px 10px 30px 10px"
   },
   formControl: {
   minWidth: 120,
   width:"100%"
 },
 selectEmpty: {
   marginTop: theme.spacing(0),
 },
 textField:{
   width:"100%",
 },
 close:{
   position:"absolute",
   right:'5%'
 }
}));

const AddEmployee = () => {
   const classes = useStyles();
   const [employee, setEmployee] = React.useState({
        first_name:"",
        last_name:"",
        role:"",
        date_of_joining:"",
        phone_number:"",
        department:"",
        designation:"",
        email:"",
        address:"",
        gender:"",
        isLoading:false,
        error:"",
        success:""
   });

  const [allDepartments, setAllDepartments] = React.useState(null);
  const [allDesignations, setAllDesignations] = React.useState(null);
  const [openForm, setOpenForm] = React.useState(false);


  React.useEffect(() => {
       getDepartments()
         .then((value) => {
           setAllDepartments(value.departments)
         })
         .catch((err) => {
           console.log(err)
         })

       getDesignations()
         .then((value) => {
           setAllDesignations(value.designations)
         })
         .catch((err) => {
           console.log(err)
         })
  }, [])


  const handleChange = (type) => e => {
    switch (type) {
      case "phone_number":
           setEmployee({...employee, phone_number: e});
        break;
      case "first_name":
           setEmployee({...employee, first_name: e.target.value });
        break;
      case "last_name":
           setEmployee({...employee, last_name: e.target.value });
        break;
      case "email":
           setEmployee({...employee, email: e.target.value });
        break;

      case "address":
           setEmployee({...employee, address: e.target.value });
        break;
      case "doj":
           setEmployee({...employee, date_of_joining: e.target.value });
        break;
      default:

    }
  }

  const handleSubmit = (e) => {
     e.preventDefault();
    setEmployee({...employee, isLoading:true})
    createEmployee(employee)
      .then((value) => {
        onBoard(value.employee._id)
          .then((response) => {
            setEmployee({...employee,
               isLoading:false,
               first_name:"",
               last_name:"",
               role:"",
               date_of_joining:"",
               phone_number:"",
               department:"",
               designation:"",
               email:"",
               address:"",
               gender:"",
               success:response.message,
               error:"" })
          })
          .catch((err) => {
            console.log(err)
          })

      })
      .catch((err) => {
          setEmployee({...employee, isLoading:false, error: err.error, success:"" })
        console.log(err)
      })
  }

  const gender = [
    { title: "MALE" },
    { title: "FEMALE" }
  ]

  const role= [
    { title: "EMPLOYEE" },
    { title: "ADMIN" }
  ]

if(!openForm){
   return <Grid container spacing={3} justify="flex-end">
           <Grid item  md={4} sm={4} xs={12}>
             <Button
              variant="contained"
              onClick={() => setOpenForm(true)}
              fullWidth
              color="primary">
               Add Employee
             </Button>
           </Grid>
        </Grid>
} else{
return <>

  <Grid container spacing={3} justify="flex-end">
        <Grid item  md={4} sm={4} xs={12}>
          <Button
           variant="contained"
           onClick={() => setOpenForm(false)}
           className={classes.close}
           color="primary">
          <CancelIcon />
          </Button>
        </Grid>
  </Grid>
  <br /><br /><br />
  <Grid container spacing={3} justify="center">
    <Grid item xs={12} md={10}>
       <Card className={classes.cardRoot} variant="outlined">
       {employee.success && <Alert severity="success">{employee.success}</Alert>}
       {employee.error && <Alert severity="error">{employee.error}</Alert>}
       <br />
       <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
             <TextField
             variant="outlined"
             onChange={handleChange("first_name")}
             value={employee.first_name}
             fullWidth
             label="First name"/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
             variant="outlined"
             onChange={handleChange("last_name")}
             value={employee.last_name}
             fullWidth
             label="Last name"/>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
               onChange={(event, newValue) => {
                 if(newValue){
                   setEmployee({...employee, department: newValue._id});
                 }
                }}

               renderTags={(val,e) => console.log(val, e)}
               options={allDepartments || ""}
               getOptionLabel={(option) => option.department_name}
               style={{ width: "100%" }}
               renderInput={(params) => <TextField {...params} label="Department" variant="outlined"   value={employee.department}/>}
             />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              onChange={(event, newValue) => {
                if(newValue){
                  setEmployee({...employee, designation: newValue._id});
                }
               }}

               options={allDesignations}
               getOptionLabel={(option) => option.designation_name}
               style={{ width: "100%" }}
               renderInput={(params) => <TextField {...params} label="Designation" variant="outlined" value={employee.designation}/>}
             />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
               options={role}
               onChange={(e, val) => {
                 if(val){
                     setEmployee({...employee, role: val.title });
                 }
               }}

               getOptionLabel={(option) => option.title}
               style={{ width: "100%" }}
               renderInput={(params) => <TextField {...params} label="Role" variant="outlined"  value={employee.role}/>}
             />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
            onChange={handleChange("email")}
            value={employee.email}
            variant="outlined"
            fullWidth
            label="Email"/>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
               onChange={(e, val) => {
                  if(val){
                      setEmployee({...employee, gender: val.title });
                  }
                }}

               options={gender}
               getOptionLabel={(option) => option.title}
               style={{ width: "100%" }}
               renderInput={(params) => <TextField {...params} label="Gender" variant="outlined"   valye={employee.gender}/>}
             />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              id="date"
              onChange={handleChange("doj")}
              label="Joining date"
              value={employee.date_of_joining}
              type="date"
              defaultValue="1999-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <MuiPhoneNumber
              defaultCountry={'in'}
              variant="outlined"
              value={employee.phone_number}
              fullWidth
              onChange={handleChange("phone_number")}/>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              onChange={handleChange("address")}
              value={employee.address}
              variant="outlined"
              fullWidth
              label="Address"/>
          </Grid>

          <Grid container justify="center" spacing={3}>
            <Grid item xs={12} md={6}>
              <br />
              <Button variant="contained" color="primary" type="submit" fullWidth>Send Invitation</Button>
            </Grid>
          </Grid>

        </Grid>
        </form>
      </Card>
    </Grid>
  </Grid>

  </>
 }
}

const AllEmployees = () => {
  return <>
           <DashboardLayout>
              {AddEmployee()}
           </DashboardLayout>
         </>
}
export default AllEmployees;
