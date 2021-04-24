import React, { useState, useEffect } from 'react';
import { Grid, Button, Divider, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getContacts } from '../../actions/contact';
import ContactList from './contactList';

const useStyles = makeStyles({
  cardRoot:{
    padding:"10px 5px 10px 5px"
  },
  button:{
    textTransform: "none",
    backgroundColor:"#101531",
    // width:"100px",
    color:"white",
    // borderRadius:"20px",
    fontWeight:500,
    fontSize:"12px",
    '&:hover': {
              backgroundColor:"#101531"
        },
  },
  selected:{
    textTransform: "none",
    backgroundColor:"dodgerblue",
    // width:"100px",
    // borderRadius:"20px",
    color:"white",
    fontWeight:500,
    fontSize:"13px",
    '&:hover': {
              backgroundColor:"dodgerblue"
        },
  }
});



const Contact = () => {
    const classes = useStyles();
    const [query, setQuery] = useState({
      role:""
    })
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
       getContacts(query)
         .then(response => {
             setContacts(response)
         })
         .catch(err => {
           console.log(err)
         })
    }, [query])

  return <div className={classes.cardRoot}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Button
                variant="contained"
                size="medium"
                fullWidth
                onClick={() => query.role == "EMPLOYEE" ? setQuery({ role: ""}) : setQuery({ role: "EMPLOYEE"})}
                className={query.role == "EMPLOYEE" ?classes.selected:classes.button}>Employees</Button>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Button
                variant="contained"
                size="medium"
                fullWidth
                onClick={() => query.role == "INTERN" ? setQuery({ role: ""}) : setQuery({ role: "INTERN"})}
                className={query.role == "INTERN" ?classes.selected:classes.button}>Interns</Button>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Button
                variant="contained"
                size="medium"
                fullWidth
                onClick={() => query.role == "CONTRACTOR" ? setQuery({ role: ""}) : setQuery({ role: "CONTRACTOR"})}
                className={query.role == "CONTRACTOR" ?classes.selected:classes.button}>Contractors</Button>
            </Grid>
          </Grid>
          <br />
          <Grid container justify="center">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <ContactList contacts={contacts}/>
            </Grid>
          </Grid>
         </div>
}

export default Contact;
