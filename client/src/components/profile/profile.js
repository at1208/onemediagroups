import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { isAuth,
         getCookie } from '../../actions/auth';
import { getSingleEmployee,
         updateProfilePicture } from '../../actions/employee';
import { uploadFile } from '../../actions/upload';
import {
  Avatar as MuiAvatar,
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Grid as MuiGrid,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import {
  Briefcase,
  PhoneCall,
  Mail,
  Calendar,
  User,
  Smile,
  Flag,
  MapPin,
} from "react-feather";
import { makeStyles } from '@material-ui/core/styles';

const token = getCookie("token");
const Button = styled(MuiButton)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const Centered = styled.div`
  text-align: center;
`;

const Avatar = styled(MuiAvatar)`
  display: inline-block;
  height: 80px;
  width: 80px;
`;

const AboutIcon = styled.span`
  display: flex;
  padding-right: 10px;

  svg {
    width: 21px;
    height: 21px;
  }
`;





const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    padding:"10px"
    },
    button:{
    textTransform: "none",
    backgroundColor:"#3f51b5",
    width:"200px",
    color:"white",
    padding:"10px",
    fontWeight:800,
    height:"40px",
    fontSize:"15px",
    '&:hover': {
    backgroundColor:"#3f51b5"
    },
  },
  uploadButton:{
    textTransform:"none"
  }
}));

function Details({ data }) {
    const token = getCookie("token");
    const id = isAuth() && isAuth()._id
    const classes = useStyles();
    const [picture, setPicture] = useState({
      uploading: false,
      url:""
    });


    const handleChange = (name) => async (e) => {
        switch (name) {
          case "featureImg":
          let file = e.target.files[0];
          let formData = new FormData();
              formData.append('upload', file);
              let url = await apiPostNewsImage(formData);
              let dbUrl = await updateProfilePicture({url}, token, id);
              setPicture({...picture, url: dbUrl && dbUrl.headshot_url, uploading:false})
            break;
          default:

        }
    }

    async function apiPostNewsImage(img) {
        setPicture({...picture, uploading:true})
          let result = await uploadFile(img, token);
          if(result){
            return result.url
          }
       }

  return (
    <Card mb={6}>
      <CardContent>
        <Centered>
          <Avatar alt=" " src={picture.url || (data && data.headshot_url) } />
          <Typography variant="body2" component="div" gutterBottom>
            <Box fontWeight="fontWeightMedium">{data && data.full_name}</Box>
            <Box fontWeight="fontWeightRegular">{data && data.designation && data.designation.designation_name}</Box>
          </Typography>
          <Box>
          <input
            onChange={handleChange("featureImg")}
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button
            className={classes.uploadButton}
               variant="contained"
               color="primary"
               component="span"
               size="small">

               {picture.uploading?"Uploading...":"Change Picture"}

            </Button>
          </label>
          </Box>
        </Centered>
      </CardContent>
    </Card>
  );
}



function About({ data }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>

        <Spacer mb={4} />

        <Grid container direction="row" alignItems="center" pb={1}>
          <Grid item mr={1} >
            <AboutIcon>
              <Briefcase />
            </AboutIcon>
          </Grid>
          <Grid item>
            {data && data.department && data.department.department_name}
          </Grid>
        </Grid>

        <Grid container direction="row" alignItems="center" pb={1}>
          <Grid item mr={1}>
            <AboutIcon>
              <MapPin />
            </AboutIcon>
          </Grid>
          <Grid item>
            {data && data.address}
          </Grid>
        </Grid>

        <Grid container direction="row" alignItems="center" pb={1}>
          <Grid item mr={1}>
            <AboutIcon>
              <Smile />
            </AboutIcon>
          </Grid>
          <Grid item>
            {data && data.gender}
          </Grid>
        </Grid>

        <Grid container direction="row" alignItems="center" pb={1}>
          <Grid item mr={1}>
            <AboutIcon>
              <PhoneCall />
            </AboutIcon>
          </Grid>
          <Grid item>
            {data && data.phone_number}
          </Grid>
        </Grid>


        <Grid container direction="row" alignItems="center" pb={1}>
          <Grid item mr={1}>
            <AboutIcon>
              <Flag />
            </AboutIcon>
          </Grid>
          <Grid item>
            {data && data.status}
          </Grid>
        </Grid>


        <Grid container direction="row" alignItems="center" pb={1}>
          <Grid item mr={1}>
            <AboutIcon>
              <User />
            </AboutIcon>
          </Grid>
          <Grid item>
            {data && data.employee_id}
          </Grid>
        </Grid>

        <Grid container direction="row" alignItems="center" pb={1}>
          <Grid item mr={1}>
            <AboutIcon>
              <Mail />
            </AboutIcon>
          </Grid>
          <Grid item>
            {data && data.email}
          </Grid>
        </Grid>

        <Grid container direction="row" alignItems="center" pb={1}>
          <Grid item mr={1}>
            <AboutIcon>
              <Calendar />
            </AboutIcon>
          </Grid>
          <Grid item>

            {data && data.date_of_joining}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}



function Profile() {
  const [ employee, setEmployee ] = useState();

  useEffect(() => {
    getSingleEmployee(isAuth() && isAuth()._id, token)
      .then((value) => {
       setEmployee(value.employees)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);


  return (
    <React.Fragment>
      <Grid container spacing={6} justify="flex-start">
        <Grid item xs={12} lg={4} xl={3}>

          <Details data={employee} />
          <About data={employee} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Profile;
