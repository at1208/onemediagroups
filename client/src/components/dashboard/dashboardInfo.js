import React, { useState, useEffect } from 'react';
import { Grid, Card,Button, Typography, Box, Avatar} from '@material-ui/core';
import { getDashboardInfo } from '../../actions/dashboard'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardRoot:{
     width:"100%"
  },
  userRoot:{
    padding:"10px"
  },
  large:{
  }
}));

const DashboardInfo = () => {
 const classes = useStyles();
 const [info,setInfo] = useState([]);

 useEffect(() => {
   getDashboardInfo()
     .then((value) => {
       setInfo(value)
       console.log(value)
     })
     .catch((err) => {
       console.log(err)
     })
 }, [])

 const countCard = (data) => {
   return <Box p={1}>
            <Typography variant="h6" align="center">
              {Object.keys(data)[0]}
            </Typography>
            <Typography variant="h4" align="center">
               {Object.values(data)[0]}
            </Typography>
          </Box>
 }

 const showUsers = (data) => {
  const count = countCard(data);
   return <>
          <Grid item sm={5} xs={12} md={3}>
            <Card className={classes.cardRoot}>
            {count}
            {data.data.map((user, i) => {
              return <Card className={classes.userRoot}>
                      <Grid container spacing={2}>
                        <Grid item sm={3} xs={3}>
                           <img src={user.picture} />
                        </Grid>
                        <Grid item sm={9} xs={9}>
                          <label>Name: </label>{user.name}
                          <br />
                          <label>Domain: </label>{user.domain.name}
                        </Grid>
                      </Grid>
                     </Card>
            })}
            <hr />
            <Typography variant="body2" align="center">Show more</Typography>
           </Card>
          </Grid>
         </>
 }

 const showBlogs = (data) => {
  const count = countCard(data);
   return <>
           <Grid item sm={5} xs={12} md={3}>
             <Card className={classes.cardRoot}>
             {count}
             {data.data.map((blog, i) => {
               return <Card className={classes.userRoot}>
                       <Grid container spacing={2}>
                         <Grid item sm={3} xs={3}>
                           <Avatar  variant="square" className={classes.large} src={blog.featureImg} />
                         </Grid>
                         <Grid item sm={9} xs={9}>
                           <label>Posted By : </label>
                           {blog.postedBy.full_name}
                           <br />
                           <label>Domain : </label>
                           {blog.domain.name}
                           <br />
                           <label>Approval : </label>
                           {blog.approval}
                           <br />
                           <label>Live status: </label>
                           {blog.status?"ACTIVE":"INACTIVE"}
                           <br />
                         </Grid>
                       </Grid>
                      </Card>
             })}
             <hr />
             <Typography variant="body2" align="center">Show more</Typography>
            </Card>
           </Grid>
         </>
 }

 const showTasks = (data) => {
  const count = countCard(data);
   return <>
          <Grid item sm={5} xs={12} md={3}>
            <Card className={classes.cardRoot}>
              {count}
            </Card>
          </Grid>
         </>
 }

 const showProjects = (data) => {
  const count = countCard(data);
   return <>
          <Grid item sm={5} xs={12} md={3}>
            <Card className={classes.cardRoot}>
              {count}
            </Card>
          </Grid>
         </>
 }

  return <>
           <Grid container justify="center" spacing={2}>
           {info.map((item, i) => {
             if(Object.keys(item)[0] === "Users"){
                return showUsers(item);
             }else if (Object.keys(item)[0] === "Blogs") {
                return showBlogs(item);
             }
             else if (Object.keys(item)[0] === "Tasks") {
                return showTasks(item);
             }
             else if (Object.keys(item)[0] === "Projects") {
                return showProjects(item);
             }else {
               return;
             }
           })}
          </Grid>
         </>
}

export default DashboardInfo;
