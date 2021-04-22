import React from "react";
import styled, { withTheme } from "styled-components/macro";
import { NavLink } from "react-router-dom";



import { red, green, blue } from "@material-ui/core/colors";

import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid as MuiGrid,
  LinearProgress as MuiLinearProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import {
  Briefcase,
  DollarSign,
  ExternalLink,
  Facebook,
  Home,
  Instagram,
  MapPin,
  ShoppingBag,
  Twitter,
} from "react-feather";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Grid = styled(MuiGrid)(spacing);

const LinearProgress = styled(MuiLinearProgress)(spacing);

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
  padding-right: 10px

  svg {
    width: 14px;
    height: 14px;
  }
`;





function Details() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Profile Details
        </Typography>

        <Spacer mb={4} />

        <Centered>
          <Avatar alt="Lucy Lavender" src="/static/img/avatars/avatar-1.jpg" />
          <Typography variant="body2" component="div" gutterBottom>
            <Box fontWeight="fontWeightMedium">Lucy Lavender</Box>
            <Box fontWeight="fontWeightRegular">Lead Developer</Box>
          </Typography>

          <Button mr={2} variant="contained" size="small">
            Follow
          </Button>
          <Button mr={2} variant="contained" color="primary" size="small">
            Message
          </Button>
        </Centered>
      </CardContent>
    </Card>
  );
}

 

function About() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>

        <Spacer mb={4} />

        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid item>
            <AboutIcon>
              <Home />
            </AboutIcon>
          </Grid>
          <Grid item>
            Lives in{" "}
            <Link href="https://material-app.bootlab.io/">
              San Fransisco, SA
            </Link>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid item>
            <AboutIcon>
              <Briefcase />
            </AboutIcon>
          </Grid>
          <Grid item>
            Works at{" "}
            <Link href="https://material-app.bootlab.io/">Material UI</Link>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <AboutIcon>
              <MapPin />
            </AboutIcon>
          </Grid>
          <Grid item>
            Lives in <Link href="https://material-app.bootlab.io/">Boston</Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}





function Profile() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom display="inline">
        Profile
      </Typography>

      <Divider my={3} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={4} xl={3}>
          <Details />
          <About />
        </Grid>
        <Grid item xs={12} lg={8} xl={9}>

        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Profile;
