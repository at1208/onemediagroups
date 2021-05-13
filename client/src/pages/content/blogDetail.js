import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Typography, Box, Chip, Card, Button } from '@material-ui/core';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { makeStyles } from '@material-ui/core/styles';
import { singleBlog } from '../../actions/blog'
import { getCookie } from '../../actions/auth'
import renderHTML from 'react-render-html';
import moment from 'moment'
import ApprovalStatus from '../../components/content/approvalstatus';
import LiveStatus from '../../components/content/livestatus';
import { reviewUpdate } from '../../actions/blog'

const useStyles = makeStyles((theme) => ({
   blogContent:{
     [theme.breakpoints.up('sm')]: {
        // padding:"10px 20px 20px 20px",
    },
    [theme.breakpoints.up('md')]: {
       // padding:"10px 100px 100px 100px",
   },
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
  blogTitle:{
     padding: "0px 0px 20px 0px",
    [theme.breakpoints.up('sm')]: {
       fontSize:"40px",
       padding: "0px 0px 50px 0px"
   },
  }
}));

const BlogDetail = ({ match: { params: { id } } }) => {
   const [blog, setBlog] = useState();
   const token = getCookie("token");
   const classes = useStyles();
   const [reload, setReload] = useState(false);
   const [reviewSetting, setReviewSetting] = useState({
     approval: "",
     status: "",
   })


   useEffect(() => {
      singleBlog(id, token)
        .then(response => {
          setBlog(response)
          setReviewSetting({ ...reviewSetting,
            approval: response.approval,
            status: response.status })
        })
        .catch(error => {
          console.log(error)
        })
   }, [reload])

const handleSave = () => {
   reviewUpdate(id, reviewSetting, token)
    .then((value) => {
       setReload(!reload)
    })
    .catch((err) => {
      console.log(err)
    })
}


const showCategories = () => {
 const categories =  blog && blog.categories.map((item, i) => {
    return <Grid container>
             <Grid item>
               <Chip size="small" label={item.name}   />
             </Grid>
          </Grid>
  })
  return <>
          <Typography variant="body1">Categories :</Typography>
          {categories}
         </>
}

 const showBlogContent = () => {
   return <>
   <Box justifyContent="center">
     <img src={blog.featureImg} width="100%"/>
   </Box>
   <Box justifyContent="center">
   <Typography variant="body1">
    {renderHTML(blog.body)}
   </Typography>
   </Box>

         </>
 }

 const showBlogDetails = () => {
   return <>
         <Grid container justify="center">
          <Grid item sm={10}>
            <Card>
            <Box>
              {showCategories()}
            </Box>
            <hr />
            <Box>
              <Typography variant="body1">Approval status :
                <Chip size="small" label={blog.approval.toLowerCase()} className={blog.approval === "WAITING"?classes.waiting:blog.approval ==="APPROVED"?classes.approved:blog.approval ==="NOT APPROVED"?classes.notApproved:""}/>
              </Typography>
            </Box>
            <hr />
            <Box>
              <Typography variant="body1">Live status :
                <Chip size="small" label={blog.status?"active":"inactive"} className={blog.status?classes.approved:classes.notApproved}/>
              </Typography>
            </Box>
            <hr />
            <Box>
              <Typography variant="body1">Posted By : {blog.postedBy.full_name}
              </Typography>
            </Box>
            <hr />
            <Box>
              <Typography variant="body1">Updated By : {blog.updatedBy.full_name}
              </Typography>
            </Box>
            <hr />
            <Box>
              <Typography variant="body1">Domain : {blog.domain.url}
              </Typography>
            </Box>
            <hr />
            <Box>
              <Typography variant="body1">CreatedAt : {moment(blog.createdAt).format("MMMM Do YYYY, h:mm a")}
              </Typography>
            </Box>
          </Card>
          </Grid>
         </Grid>
          </>
 }

 if(blog){
   return <>
           <DashboardLayout>
             <Typography variant="h4" align="center" className={classes.blogTitle}>
              {blog.title}
             </Typography>
             <Grid container justify="center" spacing={3}>
               <Grid item sm={8} md={8} xs={12} className={classes.blogContent}>
                {showBlogContent()}
               </Grid>
               <Grid item sm={3} md={3} xs={12}>
                  <Button
                   variant="contained"
                   color="primary"
                   size="small"
                   fullWidth>
                    Edit Blog
                  </Button>
                  <br /><br />
                  <Card p={2}>
                    <Box p={2}>
                    <ApprovalStatus status={blog.approval} setValue={(value) => setReviewSetting({...reviewSetting, approval: value })}/>
                    <br />
                    <LiveStatus status={blog.status} setValue={(value) => setReviewSetting({...reviewSetting, status: value })}/>
                    <br />
                      <Grid container justify="center">
                      <Grid item>
                      <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleSave}
                      className={classes.button}
                      >
                       Save Changes
                      </Button>
                      </Grid>
                      </Grid>
                    </Box>
                    <br />
                      <br />
                  {showBlogDetails()}
                  </Card>
               </Grid>
             </Grid>

           </DashboardLayout>
          </>
 }else{
   return <DashboardLayout></DashboardLayout>
 }

}

export default withRouter(BlogDetail);
