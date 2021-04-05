import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Button, Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';
import { createProject } from '../../actions/project';
import { getEmployee } from '../../actions/employee';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"20px 15px 20px 15px"
   },
   textField:{
     width:"100%",
   },
   close:{
     position:"absolute",
     right:'5%'
   },
   errorContainer:{
     height:"35px"
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




const Project = () => {
   const classes = useStyles();
   const [employees, setEmployees] = React.useState([]);
   const [project, setProject] = React.useState({
      name:"",
      description:"",
      team_leader:"",
      team_members:"",
      start_date:"",
      end_date:"",
      error:"",
      success:"",
      isLoading:false
   })

   React.useEffect(() => {
       getEmployee()
         .then((value) => {
           setEmployees(value.employees)
         })
         .catch((err) => {
           console.log(err)
         })
   }, [])


   const priority = [
     { title: "High" },
     { title: "Low" },
   ]

   const handleChange = type => e => {
       switch (type) {
          case "name":
            setProject({...project, name: e.target.value })
            break;
          case "description":
               setProject({...project, description: e.target.value })
            break;
          case "start_date":
               setProject({...project, start_date: e.target.value })
            break;
          case "end_date":
               setProject({...project, end_date: e.target.value })
            break;
          case "priority":
                setProject({...project, priority: e.target.value })
             break;
         default:

       }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      setProject({ ...project,
        isLoading:true,
      })
      createProject(project)
        .then((value) => {
          setProject({ ...project,
            name:"",
            description:"",
            team_leader:"",
            team_members:"",
            start_date:"",
            end_date:"",
            success:value.message,
            error:""
          })
        })
        .catch((err) => {
          setProject({ ...project,
            success:"",
            isLoading:false,
            error:err.error
          })
        })
   }

   const AddProject = () => {
       const [openForm, setOpenForm] = React.useState(false);

       if(!openForm){
         return <Grid container spacing={3} justify="flex-end">
                 <Grid item  md={3} sm={3} xs={12}>
                   <Button
                    className={classes.button}
                    onClick={() => setOpenForm(true)}>
                     Create Project
                   </Button>
                 </Grid>
              </Grid>
       }else{
  return <>
           <Grid container spacing={3} justify="flex-end">
                 <Grid item  md={4} sm={4} xs={12}>
                   <Button
                    onClick={() => setOpenForm(false)}
                    className={classes.close}
                    color="primary">
                   <CancelIcon />
                   </Button>
                 </Grid>
           </Grid>
           <br /><br /><br />
           <Grid container justify="center" spacing={3}>
             <Grid item sm={7} md={7} xs={12}>
               <Card className={classes.cardRoot}>
                <div className={classes.errorContainer}>
                 {project.success && <Alert severity="success">{project.success}</Alert>}
                 {project.error && <Alert severity="error">{project.error}</Alert>}
                </div>
                <br />
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                       fullWidth
                       onChange={handleChange("name")}
                       variant="outlined"
                       label="Project name" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                       fullWidth
                       multiline
                       rows={3}
                       onChange={handleChange("description")}
                       variant="outlined"
                       label="Description" />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <Autocomplete
                         onChange={(e, val) => {
                            if(val){
                              setProject({...project, team_leader: val._id })
                            }
                          }}
                         options={employees}
                         getOptionLabel={(option) => option.first_name + " " + option.last_name}
                         style={{ width: "100%" }}
                         renderInput={(params) => <TextField {...params} label="Team leader" variant="outlined" />}
                       />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Autocomplete
                          multiple
                         onChange={(e, val) => {
                           if(val){
                             let filterValue = val.map((member, i) => {
                               return member._id
                             })
                             setProject({...project, team_members: filterValue });
                           }
                          }}
                         options={employees}
                         getOptionLabel={(option) => option.first_name + " " + option.last_name}
                         style={{ width: "100%" }}
                         renderInput={(params) => <TextField {...params} label="Team members" variant="outlined" />}
                       />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      variant="outlined"
                      id="date"
                      label="Start date"
                      type="date"
                      onChange={handleChange("start_date")}
                      defaultValue={null}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      variant="outlined"
                      id="date"
                      label="End date"
                      type="date"
                      onChange={handleChange("end_date")}
                      defaultValue={null}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }} />
                    </Grid>
                    <Grid container justify="center">
                      <Grid sm={3} md={3} xs={12}>
                        <br /><br />
                         <Button
                           className={classes.button}
                           type="submit">
                           Submit
                         </Button>
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

  return <>
          <DashboardLayout>
           {AddProject()}
          </DashboardLayout>
         </>
}

export default Project;
