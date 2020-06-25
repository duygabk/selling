import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import lightGreen from '@material-ui/core/colors/lightGreen'
import { Divider, IconButton, ListItemText, Link } from '@material-ui/core';
import MailIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/ContactPhone';
import UserIcon from '@material-ui/icons/Contacts'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const oneSupporterStyles = makeStyles((theme) => ({
  card: {
    border: '1px solid #003333',
    borderRadius: 5,
    marginTop: 10,
  },
  skype: {
    color: " #ff80d5",
  },
  skypeText: {
    fontSize: '5px !important',
    fontStyle: 'italic'
  }
}));
function OneSupporter () {
  const classes = oneSupporterStyles();

  const changeMail = (event) => {
    console.log(event.targer.value)
  }

  return (
    <React.Fragment>
      <List className={classes.card}>
        <ListItem className={classes.skype}>
          <ListItemIcon style={{ color: '#cc6600' }}>
            <PhoneAndroidIcon />
          </ListItemIcon>
          <ListItemText className={classes.skypeText}>tuyenbn123</ListItemText>
        </ListItem>

        <ListItem className={classes.user}>
          <ListItemIcon style={{color: '#666633'}}>
            <UserIcon />
          </ListItemIcon>
          <Link>
           <ListItemText primary="tuyenbn" />
          </Link>
        </ListItem>

        <ListItem className={classes.phone}>
          <ListItemIcon style={{ color: '#336600' }}>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary="0974.380.175" />
        </ListItem>

        <ListItem className={classes.mail}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography color="textSecondary" style={{ fontSize: 14 }} contentEditable onChange={changeMail} >nguyenthituyen@gmail.com</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
const SupporterWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    width: SupporterWidth,
    // display: 'flex',
    marginTop: 10,
  },
  title: {
    backgroundColor: lightGreen[800],
    color: '#ffffff',
  },
}));

function Supporter () {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardHeader
          className={classes.title}
          title="Online Support"
          subheader="Please Contact to me"
        />
        <CardContent>
          <OneSupporter />
          <Divider />
          <OneSupporter />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default Supporter;