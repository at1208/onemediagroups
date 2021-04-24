import React from 'react';
import { Grid, Button, Divider, Card, Typography } from '@material-ui/core';
import ContactCard from './contactCard';

const ContactList = ({ contacts }) => {
    return contacts.map((item) => (
          <ContactCard name={item.first_name + " " + item.last_name} email={item.email} phone={item.phone_number}/>
    ))
}
export default ContactList;
