import React, { useState, useEffect } from 'react';
import { Grid, Card,Button, Typography, Box} from '@material-ui/core';
import { getDashboardInfo } from '../../actions/dashboard'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardRoot:{
     width:"100%"
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

  return <>
           <Grid container justify="center" spacing={3}>
           {info.map((item, i) => {
           return <Grid item sm={3} xs={12} md={3} key={i} >
               <Card className={classes.cardRoot}>
                 <Box p={1}>
                 <Typography variant="h6" align="center">
                   {Object.keys(item)[0]}
                 </Typography>
                 <Typography variant="h4" align="center">
                    {Object.values(item)[0]}
                 </Typography>

                </Box>
               </Card>
             </Grid>
           })}
          </Grid>
         </>
}

export default DashboardInfo;
