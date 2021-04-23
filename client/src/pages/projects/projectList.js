import React from 'react';
import { getProjects } from '../../actions/project';
import { Grid, Card, Typography, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProjectCard from '../../components/project/projectCard';
import { red, green, orange } from "@material-ui/core/colors";

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
   projectContainer:{
     padding:"15px"
   }
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
             <Grid item xs={12} sm={4} md={4} lg={4}>
               <ProjectCard
                 title={proj.name}
                 description={proj.description}
                 />
             </Grid>
           </>
  })

  return <div className={classes.projectContainer}>
           <Grid container justify="center" spacing={3}>
               {projectLists}
           </Grid>
         </div>
}

export default ProjectList;
