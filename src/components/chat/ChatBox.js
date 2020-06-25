import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import SendIcon from '@material-ui/icons/Send';
import { CardHeader, ListItemAvatar, Avatar, ListItemText, Tooltip, Fab } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import './ChatBox.css';

const messStyles = makeStyles((theme) => ({
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    alignSelf: 'flex-end',
  },
  arriveMess: {
    backgroundColor: '#33334d',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: 10,
    width: 'fit-content',
    float: 'left',
  },
  message: {
    backgroundColor: '#146EB4',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: 10,
    width: 'fit-content',
    float: 'right',
    // display: 'block',
  },
}));

const ArriveMess = (props) => {
  const classes = messStyles();
  const { message } = props;
  return (
    <ListItem alignItems="flex-start" className={classes.listItem}>
    <ListItemAvatar>
      <Avatar alt="R" src="./img/olive.jpg" />
    </ListItemAvatar>
    <ListItemText
      secondary={
        <React.Fragment>
          <Typography component="p" variant="inherit" color="textPrimary" className={classes.arriveMess}>
            {message}
          </Typography>
        </React.Fragment>
        }
      />
    </ListItem>
  )
};

const MyMessage = (props) => {
  const classes = messStyles();
  const { message } = props;
  return (
    <ListItem alignItems="flex-start" className={classes.listItem}>
      {/* <ListItemAvatar>
        <Avatar alt="R" src="./img/olive.jpg" />
      </ListItemAvatar> */}
      <ListItemText
        secondary={
          <React.Fragment>
            <Typography component="p" variant="inherit" color="textPrimary" className={classes.message}>
              {message}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

    
const styles = {
  card: {
    width: 400,
    height: 600,
    margin: '0 auto', 
    float: 'none', 
    marginbottom: '10px',
    position: 'relative',
    border: '1px solid seagreen',
  },
  header: {
    backgroundColor: '#075E54',
    color: '#E8F3EC',
  },
  input: {
    display: 'flex',
    width: '100%',
  },
  action: {
    width: '100%',
    height: 50,
    boxSizing: 'border-box',
    display: 'flex',
    padding: 10,
    position: 'absolute',
    bottom: 0,
  },
  listItem:{
    paddingTop: 0,
    paddingBottom: 0,
  },
  listMessage: {
    '& .MuiListItemAvatar-alignItemsFlexStart': {
      marginTop: 5,
    },
    '& .MuiListItemAvatar-root': {
      minWidth: 35,
    },
    '& .MuiAvatar-root': {
      width: 30,
      height: 30,
    }
  },
};

class App extends Component {

  constructor(props) {
    super(props);
    // this.chat = new ChatClient.Chat(`BasicChatApp`);
    this.state = {
      showChat: false,
      chatInput: '',
      messages: ["test message"],
      comingMess: "From you",
      messageList: [],
    }
  }

  sendChat = () => {
    console.log("Sending Chat");
    console.log(this.state.chatInput);
    let { chatInput, messages, messageList } = this.state;
    if (chatInput === "") return;
    messageList = [...messageList, <MyMessage message={chatInput}/>, <ArriveMess message="me too"/>]
    messages.push(chatInput);
    this.setState({
      messages: messages,
      chatInput: '',
      messageList,
    })
  }

  setChatInput = (event) => {
    this.setState({ chatInput: event.target.value })
  }

  componentDidMount() {
    let { messageList, comingMess } = this.state;
    messageList.push(<ArriveMess message={comingMess}/>)
    this.setState({ messageList })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        this.sendChat();
    }
  }

  showChatBox = () => {
    this.setState({showChat: true})
  }

  hideChatBox = () => {
    this.setState({showChat: false})
  }

  render(){
    const { showChat } = this.state;
    if ( !showChat ) return (
      <>
        <div className="chatIcon">
          <Tooltip title="Chat With Us" aria-label="Chat">
            <Fab color="default" onClick={this.showChatBox}>
              <ChatIcon />
            </Fab>
          </Tooltip>
        </div>
      </>
    );

    const { classes } = this.props;
    console.log(this.state.messageList)
    return(
      <div className="chatbox">
      <Card className={classes.card}>
          <CardHeader title="Chat Box" className={classes.header} onClick={this.hideChatBox} action={<Button size="large" onClick={this.hideChatBox}><CloseIcon style={{ color: '#990000' }}/></Button>}/>
          <CardContent className={classes.content, "content"}>
            <List className={classes.listMessage}>
              {this.state.messageList}
            </List>
          </CardContent>
          <CardActions className={classes.action}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter a message"
              value={this.state.chatInput}
              className={classes.input}
              onKeyDown={this.handleKeyPress}
              onChange={this.setChatInput}
              inputProps={{'aria-label': ''}}
            />
            <Button size="small" color="primary">
              <SendIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
      );
    }
  }

const ChatComponent = withStyles(styles)(App);

export default ChatComponent;