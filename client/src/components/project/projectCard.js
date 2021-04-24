import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { taskCountByProject } from '../../actions/task';
import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
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
  color: white;
  background-color:rgbcolor,
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
   backgroundColor:"dodgerblue"
  },
  doneChip:{
   backgroundColor:'rgb(76, 175, 80)'
  },
  chipContainer:{
    padding:"0px 15px 15px 15px"
  }

}));


function Project({ image, title, description, chip, project_id }) {
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


  return (
    <Card mb={6}>
      {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
      <Card className={classes.cardRoot}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        {taskCount && <Grid container spacing={3} className={classes.chipContainer}>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Chip label={`Open task  - ${taskCount.open}`} className={classes.openChip} />
          </Grid>

          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Chip label={`Done task  - ${taskCount.done}`} className={classes.doneChip} />
          </Grid>
        </Grid>}
        <Typography mb={4} component="body1">
          {description}
        </Typography>
         <br /><br />
        <AvatarGroup max={3}>
          <Avatar alt="Avatar" src="/static/img/avatars/avatar-1.jpg" />
          <Avatar alt="Avatar" src="/static/img/avatars/avatar-2.jpg" />
          <Avatar alt="Avatar" src="/static/img/avatars/avatar-3.jpg" />
        </AvatarGroup>
      </Card>
      {/*<CardActions>
      </CardActions>*/}
    </Card>
  );
}

export default Project;
