import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Button, Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"40px 10px 40px 10px"
   },
   textField:{
     width:"100%",
   },
   close:{
     position:"absolute",
     right:'5%'
   }
}));


      // team_leader,
      // team_members,
      // start_date,
      // priority

const Project = () => {
   const classes = useStyles();
   const [project, setProject] = React.useState({
      name:"",
      description:"",
      team_leader:"",
      team_members:"",
      start_date:"",
      end_date:"",
      priority:""
   })

   const team_leader = [
     { title: "Geeks Ocean"},
     { title: "Geek Boy"}
   ]
   const team_members = [
     { title: "Aman Tiwari" },
     { title: "Sachin Tiwari" },
   ]
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
      e.preventDefault()
   }

   const AddProject = () => {
       const [openForm, setOpenForm] = React.useState(false);

       if(!openForm){
         return <Grid container spacing={3} justify="flex-end">
                 <Grid item  md={4} sm={4} xs={12}>
                   <Button
                    variant="contained"
                    onClick={() => setOpenForm(true)}
                    fullWidth
                    color="primary">
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
             <Grid item sm={10} md={10} xs={12}>
               <Card className={classes.cardRoot}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                       fullWidth
                       onChange={handleChange("name")}
                       variant="outlined"
                       label="Project name" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                      <TextField
                       fullWidth
                       multiline
                       rows={3}
                       onChange={handleChange("description")}
                       variant="outlined"
                       label="Description" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <Autocomplete
                         onChange={(e, val) => {
                            if(val){
                              setProject({...project, team_leader: val._id })
                            }
                          }}
                         options={team_leader}
                         getOptionLabel={(option) => option.title}
                         style={{ width: "100%" }}
                         renderInput={(params) => <TextField {...params} label="Team leader" variant="outlined" />}
                       />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Autocomplete
                          multiple
                         onChange={(e, val) => {
                            if(val){
                                 // setProject({...task, team_members: val._id })
                            }
                          }}
                         options={team_members}
                         getOptionLabel={(option) => option.title}
                         style={{ width: "100%" }}
                         renderInput={(params) => <TextField {...params} label="Team members" variant="outlined" />}
                       />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      variant="outlined"
                      id="date"
                      label="Start date"
                      type="date"
                      onChange={handleChange("start_date")}
                      defaultValue="1999-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      variant="outlined"
                      id="date"
                      label="End date"
                      type="date"
                      onChange={handleChange("end_date")}
                      defaultValue="1999-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }} />
                    </Grid>
                    <Grid container justify="center">
                      <Grid sm={6} md={5} xs={12}>
                        <br /><br />
                         <Button
                           color="primary"
                           fullWidth
                           type="submit"
                           variant="contained">
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
