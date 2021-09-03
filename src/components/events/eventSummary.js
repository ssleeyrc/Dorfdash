import React, {useEffect, useState} from 'react';
import { Context } from '../../_Context/Context.js';
import { useContext } from 'react';
import { Container, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },

  container: {
     borderColor: '#ECECEC',
     borderStyle: 'solid',
     marginTop:20,
     lineHeight:2,
     padding:0,
  },
  span: {
    color: '#037041',
    fontStyle:'italic',
    fontWeight:900,
    padding:10
  },
  spanDivs: {
    marginBottom:10,
  },
  gridStyle: {
    paddingTop:10,
  }
}));

const EventSummary = (props) => {

  const { currentEvent, setCurrentEvent } = useContext(Context);
  const { currentUser, setCurrentUser } = useContext(Context);
  const[driverDetails, setDriverDetails] = useState({});

  const classes = useStyles();

  let history = useHistory();

  const handleUpcomingEventPage =() => {
    history.push("/myList");
  }

  const getDriverDetails = () => {
    if (driverDetails.driver_name !== undefined) {
      return;
    }

    axios.get(`/data/riders/driverInfo/${currentUser.email}/${currentEvent.event_name}`,{})
    .then((response) => {
      setDriverDetails(response.data)
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getDriverDetails();
  })



  return (
    <Container maxWidth="xs" className={classes.container}>
    <Header />
      <Container maxWidth="xs">
      {/* {samples.map(item => ( */}
      <Grid container justify="center" alignItems="center" className={classes.gridStyle}>
        <Grid item xs={10}>
            <div className={classes.spanDivs}>
            <span className={classes.span}>Event: </span>
            <span style = {{fontWeight:900}}>{currentEvent.event_name}</span>
            </div>

            <div className={classes.spanDivs}>
            <span className={classes.span}>Host: </span>
            <span>{currentEvent.host_email}</span>
            </div>

            <div className={classes.spanDivs}>
              <span className={classes.span}>Date: </span>
              <span>{currentEvent.date}</span>
            </div>

            <div className={classes.spanDivs}>
              <span className={classes.span}>Time: </span>
              <span>{currentEvent.time}</span>
            </div>

            <div className={classes.spanDivs}>
              <span className={classes.span}>Location: </span>
              <span>{currentEvent.location}</span>
            </div>
            {driverDetails.driver_name === undefined &&
            <>
              <span style={{fontWeight:700}}>You Will Be Notified Soon By Your Driver</span>
              <span><Button variant="contained"  className={classes.root}
              style={{backgroundColor: '#20A46B', color: '#FFFFFF', margin: 20}}
              onClick = {getDriverDetails}>
        Refresh
       </Button></span>
          </>
            }

             {driverDetails.driver_name !== undefined &&
             <div style={{backgroundColor:'#20A46B'}}>
               <span style={{fontWeight:700}}>You Will Be Picked Up By</span>
              <div>{driverDetails.driver_name}</div>
              <div>{driverDetails.phone}</div>
              <div>{driverDetails.vehicle_info}</div>
             </div>

            }

            </Grid>

        </Grid>
        {/* ))} */}
        {/* <Button variant="contained"  className={classes.root}
         style={{backgroundColor: '#12824C', color: '#FFFFFF', margin: 20}}
         onClick = {handleUpcomingEventPage}>
  Back
</Button> */}
<Button variant="contained"  className={classes.root}
         style={{backgroundColor: '#20A46B', color: '#FFFFFF', margin: 20}}
         onClick = {handleUpcomingEventPage}>
  Back to Events
</Button>

    </Container>
    <Footer />
    </Container>

    )}
export default EventSummary;