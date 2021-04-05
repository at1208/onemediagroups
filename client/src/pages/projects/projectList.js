import React from 'react';
import { getProjects } from '../../actions/project';
import { Grid, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"10px 10px 10px 10px"
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


const ProjectList = () => {
  const [projects, setProjects] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    getProjects()
      .then((value) => {
        setProjects(value.projects)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const projectLists = projects.map((proj, i) => {
    return <>
           <Grid item xs={12} sm={4} md={3}>
             <Card className={classes.cardRoot}>
               <Typography
                variant="h6"
                >
                {proj.name}
               </Typography>
               <Typography
                variant="body2">
                {proj.description}
               </Typography>
             </Card>
           </Grid>
           </>
  })

  return <>
           <Grid container justify="center" spacing={3} align="center">
               {projectLists}
           </Grid>
         </>
}

export default ProjectList;
