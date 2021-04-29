import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { taskCountByProject } from '../../actions/task';
import { getCookie } from '../../actions/auth';
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
import DeleteDialog from './deleteModal';
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from "@material-ui/system";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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


function Project({ image,  project, edit }) {
    const [taskCount, setTaskCount] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const token = getCookie("token")

    useEffect(() => {
       taskCountByProject(project._id, token)
         .then(value => {
            setTaskCount(value)
         })
         .catch(err => {
           console.log(err)
         })
    }, []);

    const handleClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = (name)  => {
      if(name == "edit"){
         edit(project)
      }
      setAnchorEl(null);
    };

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
         <MoreVertIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickMenu}/>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
              <MenuItem onClick={() => handleCloseMenu("edit")}>
                <Button size="small"   color="primary">
                  Edit
                </Button>
              </MenuItem>
              <MenuItem>
                <DeleteDialog id={project._id}/>
              </MenuItem>
          </Menu>
         </Grid>
       </Grid>
        {taskCount && <Grid container spacing={3} className={classes.chipContainer}>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Chip label={<>Open {taskCount.open}</>} className={classes.openChip} />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Chip label={<>Done {taskCount.done}</>} className={classes.doneChip} />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Chip label={<>{project.priority}</>} className={classes.doneChip} />
          </Grid>
        </Grid>}
        <Typography mb={4} component="body1">
          {project.description}
        </Typography>
          <br /><br />
          <Grid container justify="flex-start">
            <Grid item sm={3} xs={4} md={3}>
              <Box pl={1}>
                <small>Team Lead</small>
                <Avatar alt={project.team_leader && project.team_leader.full_name} src="" />
              </Box>
            </Grid>
            <Grid item sm={9} xs={8} md={9}>
              <Box pl={1}>
                 <small>Team members</small>
                <AvatarGroup max={3}>
                 <Avatar alt={project.team_members && project.team_members[0] && project.team_members[0].full_name} src="" />
                 <Avatar alt="Avatar" src="/static/img/avatars/avatar-2.jpg" />
                 <Avatar alt="Avatar" src="/static/img/avatars/avatar-3.jpg" />
                </AvatarGroup>
              </Box>
            </Grid>
          </Grid>
           <br />
           <Divider />
          <Box pl={1}>
           <a href={project.domain && project.domain.name}>Learn more</a>
          </Box>


      </Card>
      {/*<CardActions>
      </CardActions>*/}
    </Card>
  );
}

export default Project;
