import { Container, AppBar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  div: {
    width: '100vw',
    maxWidth: '100vw',
    padding: '0',
    height: '100vh'
  },

  header: {
    backgroundColor: '#20A46B'
  },
  headerTitle: {
    margin: '0',
    padding: '2%',
  },
  footer: {
    width: '100vw',
    maxWidth: '100vw',
    backgroundColor: '#3F3F3F',
    padding: '2% 2% 5% 2%',
    textAlign: 'center',
    color: '#fff'
  },
  card: {
    padding: '6%',
    margin: '15% auto',
    borderRadius: '25px',
    boxShadow: '0px 5px 22px 0px rgba(0,0,0,0.65)',
    display: 'flex',
    flexDirection: 'column'
  },
  createButton: {
    padding: '5%',
    backgroundColor: '#20A46B',
    color: '#fff',
    marginBottom: '10%'
  },
  attendButton: {
    padding: '5%',
    backgroundColor: '#20A46B',
    color: '#fff',
    marginTop: '10%'
  }
});

const NewUser = () => {
  const classes = useStyles();

  // ROUTING EXAMPLE FOR BUTTON CLICKS
  // import { Link } from 'react-router-dom'
  // import Button from '@material-ui/core/Button';

  // <Button component={Link} to="/new/location/">
  //   Click Me
  // </Button>

  return (
    <Container className={classes.div}>
      <AppBar position="static" className={classes.header}>
        <Typography variant="h3" className={classes.headerTitle}>
          Dorfdash
        </Typography>
      </AppBar>
      <Container className={classes.card} maxWidth="xs">
        <Button className={classes.createButton}>
          Create Event
        </Button>
        <Button className={classes.attendButton}>
          Attend Event
        </Button>
      </Container>
      <Container className={classes.footer}>
        <p>Designed by Team GUCCI @ 2021</p>
      </Container>
    </Container>
  )
}

export default NewUser;