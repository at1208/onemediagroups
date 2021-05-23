import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import { getDepartments } from '../../actions/department';
import { getDesignations } from '../../actions/designation';
import {  Grid,
          Button,
          Card,
          TextField,
          Box,
          Dialog,
          DialogActions,
          DialogContent,
          Typography,
          DialogTitle} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { updateEmployee } from '../../actions/employee';
import { getCookie } from '../../actions/auth';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
RemoveRedEye as RemoveRedEyeIcon
} from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    // padding:"10px",
  },
  button:{
    textTransform: "none",
    backgroundColor:"#3f51b5",
    // width:"200px",
    color:"white",
    fontWeight:500,
    fontSize:"15px",
    '&:hover': {
              backgroundColor:"#3f51b5"
        },
  },
  cardRoot:{
    // padding:"30px 10px 30px 10px"
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
},
root: {
  margin: 0,
  padding: theme.spacing(2),
},
closeButton: {
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
},
}));


const EditEmployee = ({ editEmployee }) => {
  const [open, setOpen] = React.useState(false);
  const token = getCookie("token")
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

 const [allDepartments, setAllDepartments] = React.useState([]);
 const [allDesignations, setAllDesignations] = React.useState([]);



 const handleClickOpen = () => {
  setOpen(true);
 };


 const handleClose = () => {
  setOpen(false);
 };

 React.useEffect(() => {
      getDepartments(token)
        .then((value) => {
          setAllDepartments(value.departments)
        })
        .catch((err) => {
          console.log(err)
        })

      getDesignations(token)
        .then((value) => {
          setAllDesignations(value.designations)
        })
        .catch((err) => {
          console.log(err)
        })
 }, [])

React.useEffect(() => {
  setEmployee({...employee,

     first_name:editEmployee.first_name,
     last_name:editEmployee.last_name,
     role:editEmployee.role,
     date_of_joining:"",
     phone_number:editEmployee.phone_number,
     department:editEmployee.department,
     designation:editEmployee.designation,
     email:editEmployee.email,
     address:editEmployee.address,
     gender:editEmployee.gender, })
}, [editEmployee])

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
   updateEmployee(editEmployee._id, employee, token)
     .then((value) => {
           setEmployee({...employee, isLoading:false, success: value.message, error: ""})
         })
     .catch((err) => {
         setEmployee({...employee, isLoading:false, success: "", error: err.error})
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
             <Box mr={0}>
               <IconButton aria-label="details" onClick={handleClickOpen}>
                 <RemoveRedEyeIcon />
               </IconButton>
             </Box>
             </Grid>
             <Dialog open={open} onClose={handleClose} disableBackdropClick>
             <div className={classes.dialogRoot}>
              <form onSubmit={handleSubmit}>
              <DialogContent>
                <DialogTitle
                 id="customized-dialog-title"
                 onClose={handleClose}
                 disableTypography
                 className={classes.root}>
                <Typography variant="h6">Update Employee</Typography>
                  {open ? (
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      className={classes.closeButton}
                    >
                      <CloseIcon />
                    </IconButton>
                  ) : null}
                </DialogTitle>
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
                           disabled
                           onChange={handleChange("first_name")}
                           value={employee.first_name}
                           fullWidth
                           size="small"
                           label="First name"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                           disabled
                           variant="outlined"
                           onChange={handleChange("last_name")}
                           value={employee.last_name}
                           fullWidth
                           size="small"
                           label="Last name"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Autocomplete
                            defaultValue={employee.department}
                             onChange={(event, newValue) => {
                               if(newValue){
                                 setEmployee({...employee, department: newValue._id});
                               }
                              }}
                             size="small"
                             renderTags={(val,e) => console.log(val, e)}
                             options={allDepartments}
                             getOptionLabel={(option) => option.department_name}
                             style={{ width: "100%" }}
                             renderInput={(params) => <TextField {...params} label="Department" variant="outlined"   value={employee.department}/>}
                           />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Autocomplete
                          defaultValue={employee.designation}
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
                             defaultValue={{ title: employee.role }}
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
                          defaultValue={employee.email}
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Email"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Autocomplete
                            defaultValue={{ title: employee.gender }}
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
                        {/*<Grid item xs={12} md={6}>
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
                        </Grid>*/}

                        <Grid item xs={12} md={6}>
                          <MuiPhoneNumber
                            defaultCountry={'in'}
                            variant="outlined"
                            disabled
                            defaultValue={employee.phone_number}
                            size="small"
                            value={employee.phone_number}
                            fullWidth
                            onChange={handleChange("phone_number")}/>
                        </Grid>

                        <Grid item xs={12} md={12}>
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
                <Button className={classes.button} type="submit" disabled={employee.isLoading}>Update</Button>
              </DialogActions>
             </form>
            </div>
            </Dialog>
            </>
}

export default EditEmployee;
