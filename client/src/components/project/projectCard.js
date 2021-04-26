import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { taskCountByProject } from '../../actions/task';
import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Box,
  Card as MuiCard,
  CardActions,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@material-ui/core";
import { AvatarGroup as MuiAvatarGroup } from "@material-ui/lab";
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from "@material-ui/system";
import MoreVertIcon from '@material-ui/icons/MoreVert';
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)`
  border-bottom: 1px solid grey;
`;
const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  color: black;
  margin-bottom: 10px;
`;
const AvatarGroup = styled(MuiAvatarGroup)`
  margin-left: 10px;
`;


const useStyles = makeStyles((theme) => ({
  cardRoot:{
    padding:"10px"
  },
  openChip:{
    // backgroundColor:"rgb(255, 152, 0)"
   // backgroundColor:"dodgerblue"
  },
  doneChip:{
   // backgroundColor:'rgb(76, 175, 80)'
  },
  chipContainer:{
    padding:"0px 15px 15px 15px"
  }

}));


function Project({ image, title, description, chip, project_id, project }) {
    const [taskCount, setTaskCount] = useState();
    const classes = useStyles();

    useEffect(() => {
       taskCountByProject(project_id)
         .then(value => {
            setTaskCount(value)
         })
         .catch(err => {
           console.log(err)
         })
    }, []);

console.log(project)

  return (
    <Card mb={6}>
      {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
      <Card className={classes.cardRoot}>
       <Grid container>
         <Grid item xs={11} sm={11} md={11}>
         <Typography gutterBottom variant="h6" component="h2">
           {project.name}
         </Typography>
         </Grid>
         <Grid item xs={1} sm={1} md={1}>
            <MoreVertIcon />
         </Grid>
       </Grid>

        {taskCount && <Grid container spacing={3} className={classes.chipContainer}>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Chip label={<>Open task  <b>{taskCount.open}</b></>} className={classes.openChip} />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Chip label={<>Done task  <b>{taskCount.done}</b></>} className={classes.doneChip} />
          </Grid>
        </Grid>}
        <Typography mb={4} component="body1">
          {project.description}
        </Typography>
          <br />
          <Grid container justify="flex-start">
            <Grid item sm={3} xs={4} md={3}>
              <Box pl={1}>
                <small>Team Lead</small>
                <Avatar alt={project.team_leader.full_name} src="" />
              </Box>
            </Grid>
            <Grid item sm={9} xs={8} md={9}>
              <Box pl={1}>
                 <small>Team members</small>
                <AvatarGroup max={3}>
                 <Avatar alt={project.team_members[0].full_name} src="" />
                 <Avatar alt="Avatar" src="/static/img/avatars/avatar-2.jpg" />
                 <Avatar alt="Avatar" src="/static/img/avatars/avatar-3.jpg" />
                </AvatarGroup>
              </Box>
            </Grid>
          </Grid>
           <br />
           <Divider />
          <Box pl={1}>
           <a href={project.domain.name}>{project.domain.name}</a>
          </Box>


      </Card>
      {/*<CardActions>
      </CardActions>*/}
    </Card>
  );
}

export default Project;
