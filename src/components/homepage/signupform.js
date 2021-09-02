import useStyles from './homepage_styles.js';
import { Context } from '../../_Context/Context.js';

import { useState, useEffect, useContext } from 'react';
import {  Container, TextField, Button, FormControl } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

/*
  for rider, it should lead to event page with driver

  for driver, it should lead to map page with people who they're picking up

  - when they sign back in, they should have access this page

  they should also be able to keep track of if they're driver/rider
  and the buttons should either be displayed or not depending on who they are

*/

const axios = require('axios');

// This component will be what is displayed on the homepage
// This is the log in form
// inputs for : first name, lastname, email, username,
// sign up button
const SignUpForm = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const { currentUser, setCurrentUser } = useContext(Context);

  const [validInfo, setValidInfo] = useState(false);

  let handleFirstName = (e) => {
    // console.log(e.target.value);
    setFirstName(e.target.value);
  }

  let validFName = () => {
    return firstName === '' ? false : true;
  }

  let handleLastName = (e) => {
    // console.log(e.target.value);
    setLastName(e.target.value);
  }

  let validLName = () => {
    return lastName === '' ? false : true;
  }

  let handleEmail = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  }

  let validateEmail = () => {
    let validRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }



  let validateInformation = () => {
    if (firstName === '' || lastName === '' || validateEmail(email) === false) {
      return false;
    }
    setValidInfo(true);
    return true;
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    validateInformation() ? console.log('true') : console.log('false');

    // validate that information has been put in
    if (validateInformation()) {
      // if information has been correctly put in
      setCurrentUser({
        name: firstName + ' ' + lastName,
        email: email
      });

      axios({
        method: 'post',
        url: 'http://localhost:3100/data/users',
        data: {
          name: firstName + ' ' + lastName,
          email: email
        }
      })
        .then((response) => console.log(response))
        .catch((err) => console.log('err', err));
    } else {
      console.log('please enter correct info');
    }

    // console.log(firstName + ' ' + lastName + ' ' + email);
    // set up an axios post request to backend

  }

  const validLink = validInfo ? '/newUser' : '#';

  return (
    <Container className={classes.form} maxWidth="xs">
      <h2 className={classes.title}>New Here?</h2>
      <TextField fullWidth={true} id="filled-basic" label="First Name" variant="filled" required margin="normal"
        onChange={(e) => {
          handleFirstName(e);
          validFName();
        }}/>
        {validFName() ? <p></p> : <p className={classes.error}>Please enter first name</p>}
      <TextField fullWidth={true} id="filled-basic" label="Last Name" variant="filled" required margin="normal"
        onChange={(e) => {
          handleLastName(e);
          validLName();
        }}/>
        {validLName() ? <p></p> : <p className={classes.error}>Please enter last name</p>}
      <TextField fullWidth={true} id="filled-basic" label="Email" variant="filled" required margin="normal"
       onChange={(e) => {
         handleEmail(e);
         validateEmail();
        }}/>
       {validateEmail() ? <p></p> : <p className={classes.error}>Please enter proper email</p>}
     <Button className={classes.signupBtn} onClick={(e) => handleSubmit(e)}>
        <Link className={classes.link} to={validLink}>Sign Up</Link>
     </Button>
      <Container className={classes.returningContainer}>
        <p>Already have an account?</p>
        <Button className={classes.loginBtn}>
          <Link className={classes.link2} to="/returningUser">Log In</Link>
        </Button>
      </Container>
    </Container>
  )

}

export default SignUpForm;