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
const Tasks = () => {
   const classes = useStyles();
   const [task, setTask] = React.useState({
      title:"",
      description:"",
      project:"",
      assignee:"",
      follower:"",
      deadline:""
   })

   const project = [
     { title: "Geeks Ocean"},
     { title: "Geek Boy"}
   ]
   const assignee = [
     { title: "Aman Tiwari" },
     { title: "Sachin Tiwari" },
   ]
   const follower = [
     { title: "Aman Tiwari" },
     { title: "Sachin Tiwari" },
   ]

   const handleChange = type => e => {
       switch (type) {
          case "title":
            setTask({...task, title: e.target.value })
            break;
          case "description":
               setTask({...task, description: e.target.value })
            break;
          case "deadline":
               setTask({...task, deadline: e.target.value })
            break;
         default:

       }
   }

   const handleSubmit = (e) => {
      e.preventDefault()
   }

   const AddTask = () => {
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
                       onChange={handleChange("title")}
                       variant="outlined"
                       label="Title" />
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
                              setTask({...task, project: val._id })
                            }
                          }}
                         options={project}
                         getOptionLabel={(option) => option.title}
                         style={{ width: "100%" }}
                         renderInput={(params) => <TextField {...params} label="Project" variant="outlined" />}
                       />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Autocomplete
                         onChange={(e, val) => {
                            if(val){
                              setTask({...task, assignee: val._id })
                            }
                          }}
                         options={assignee}
                         getOptionLabel={(option) => option.title}
                         style={{ width: "100%" }}
                         renderInput={(params) => <TextField {...params} label="Assignee" variant="outlined" />}
                       />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Autocomplete
                         onChange={(e, val) => {
                            if(val){
                                 setTask({...task, follower: val._id })
                            }
                          }}
                         options={follower}
                         getOptionLabel={(option) => option.title}
                         style={{ width: "100%" }}
                         renderInput={(params) => <TextField {...params} label="Follower" variant="outlined" />}
                       />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      variant="outlined"
                      id="date"
                      label="Deadline"
                      type="date"
                      onChange={handleChange("deadline")}
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
             {AddTask()}
          </DashboardLayout>
         </>
}

export default Tasks;
