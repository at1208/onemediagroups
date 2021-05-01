import React from "react";
import styled, { withTheme } from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { red, green, blue } from "@material-ui/core/colors";
import { isAuth } from '../../actions/auth'

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
        <Centered>
          <Avatar alt=" " src=" " />
          <Typography variant="body2" component="div" gutterBottom>
            <Box fontWeight="fontWeightMedium">{isAuth() && (isAuth().first_name + " " + isAuth().last_name)}</Box>
            {/*<Box fontWeight="fontWeightRegular"></Box>*/}
          </Typography>
        </Centered>
      </CardContent>
    </Card>
  );
}



function About() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>

        <Spacer mb={4} />

        <Grid container direction="row" alignItems="center">
          <Grid item mr={1}>
            <AboutIcon>
              <MapPin />
            </AboutIcon>
          </Grid>
          <Grid item>
            Lives in  Delhi
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}



function Profile() {
  return (
    <React.Fragment>
      <Grid container spacing={6} justify="flex-start">
        <Grid item xs={12} lg={4} xl={3}>
          <Details />
          <About />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Profile;
