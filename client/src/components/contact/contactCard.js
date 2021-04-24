import React from 'react';
import { Grid, Button, Divider, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root:{
    margin:"5px 0pc 5px 0px"
  },
  cardRoot:{
    padding:"5px"
  }
});

const ContactCard = ({ name, phone, email }) => {
  const classes = useStyles();

  return <div className={classes.root}>
          <Card className={classes.cardRoot}>
            <Grid container justify="flex-start">
              <Grid item xs={3} sm={2} md={2} lg={2}>
                <img src="/user.png" width={40} height={40} />
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8}>
                <Typography variant="body1">
                  {name}
                </Typography>
                <Typography variant="body1">
                  {phone}
                </Typography>
              </Grid>
            </Grid>
          </Card>
         </div>
}
export default ContactCard;
