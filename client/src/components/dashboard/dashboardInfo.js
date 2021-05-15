import React, { useState, useEffect } from 'react';
import { Grid, Card,Button, Typography, Box, Avatar, Chip} from '@material-ui/core';
import { getDashboardInfo } from '../../actions/dashboard'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardRoot:{
     width:"100%"
  },
  userRoot:{
    padding:"10px"
  },
  approved:{
   background: "rgb(76, 175, 80)",
   color:"rgb(255, 255, 255)",
   // marginLeft:"10px",
   "&:hover":{
     background: "rgb(76, 175, 80)",
     color:"rgb(255, 255, 255)",
   },
  },
  button:{
  textTransform:"none"
  },
  notApproved:{
   background: "rgb(244, 67, 54)",
   color:"rgb(255, 255, 255)",
   "&:hover":{
     background: "rgb(244, 67, 54)",
     color:"rgb(255, 255, 255)",
   },
   // marginLeft:"10px"
  },
  waiting:{
   background: "rgb(245, 124, 0)",
   color:"rgb(255, 255, 255)",
   // marginLeft:"10px",
   "&:hover":{
     background: "rgb(245, 124, 0)",
     color:"rgb(255, 255, 255)",
   },
  },
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
               let chipstatus = blog.status?classes.approved:classes.notApproved;
               let chipcolor = blog.approval === "APPROVED"?classes.approved:blog.approval === "NOT APPROVED"?classes.notApproved:blog.approval === "WAITING"?classes.waiting:""
               return <Card className={classes.userRoot}>
                       <Grid container spacing={2}>
                         <Grid item sm={3} xs={3}>
                           <img  alt="Feature Image" src={blog.featureImg} />
                         </Grid>
                         <Grid item sm={9} xs={9}>
                            <Box mb={1}>
                            <Typography variant="p">Posted By : </Typography>
                            <Typography variant="p">{blog.postedBy.full_name}</Typography>
                           </Box>
                             <Box mb={1}>
                            <Typography variant="p">Domain : </Typography>
                            <Typography variant="p"> {blog.domain.name}</Typography>
                           </Box>
                             <Box mb={1}>
                            <Typography variant="p">Approval : </Typography>
                            <Chip className={chipcolor} label={blog.approval.toLowerCase()} size="small"/>
                           </Box>
                             <Box mb={1}>
                            <Typography variant="p">Live status : </Typography>
                            <Chip className={chipstatus} label={blog.status?"active":"inactive"} size="small"/>
                           </Box>
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
