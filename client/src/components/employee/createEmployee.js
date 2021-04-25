import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MuiPhoneNumber from 'material-ui-phone-number';

import { getDepartments } from '../../actions/department';
import { getDesignations } from '../../actions/designation';
import { createEmployee } from '../../actions/employee';
import { onBoard } from '../../actions/auth';



import { Grid, Button, Card, TextField, Dialog,
DialogActions,
DialogContent,
DialogContentText,
DialogTitle} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';
import { createProject } from '../../actions/project';
import { getEmployee } from '../../actions/employee';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    padding:"10px",

  },
  button:{
    textTransform: "none",
    backgroundColor:"#3f51b5",
    // width:"200px",
    color:"white",
    fontWeight:800,
    fontSize:"15px",
    '&:hover': {
              backgroundColor:"#3f51b5"
        },
  },
  cardRoot:{
    // padding:"30px 10px 30px 10px"
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


const CreateEmployee = ({  }) => {
  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
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

 const handleClickOpen = () => {
  setOpen(true);
 };


 const handleClose = () => {
  setOpen(false);
 };

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


    return  <>
             <Grid container justify="center">
               <Button
                variant="contained"
                className={classes.button}
                onClick={handleClickOpen}
                color="primary"
                >
                 Add Employee
               </Button>
             </Grid>
             <Dialog open={open} onClose={handleClose} >
             <div className={classes.dialogRoot}>
              <form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={3} justify="center">
                  <Grid item xs={12} md={12}>
                     <Card className={classes.cardRoot}>
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
                           size="small"
                           label="First name"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                           variant="outlined"
                           onChange={handleChange("last_name")}
                           value={employee.last_name}
                           fullWidth
                           size="small"
                           label="Last name"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Autocomplete
                             onChange={(event, newValue) => {
                               if(newValue){
                                 setEmployee({...employee, department: newValue._id});
                               }
                              }}
                             size="small"
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
                             size="small"
                             options={allDesignations}
                             getOptionLabel={(option) => option.designation_name}
                             style={{ width: "100%" }}
                             renderInput={(params) => <TextField {...params} label="Designation" variant="outlined" value={employee.designation}/>}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Autocomplete
                             options={role}
                             size="small"
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
                          size="small"
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
                             size="small"
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
                            size="small"
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
                            size="small"
                            value={employee.phone_number}
                            fullWidth
                            onChange={handleChange("phone_number")}/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            size="small"
                            onChange={handleChange("address")}
                            value={employee.address}
                            variant="outlined"
                            fullWidth
                            label="Address"/>
                        </Grid>

                      </Grid>
                      </form>
                    </Card>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button className={classes.button} type="submit" disabled={employee.isLoading}>Send Invitation</Button>
              </DialogActions>
             </form>
            </div>
            </Dialog>
            </>
}

export default CreateEmployee;
