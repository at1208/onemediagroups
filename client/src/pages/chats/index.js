import React from 'react';
import { withRouter } from 'react-router-dom';
import DashboardLayout from '../../components/layout/dashboardLayout';
import socket from '../../utils/socketio';
import { Grid, Card, TextField, Button, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { getCookie, isAuth } from '../../actions/auth';
import moment from 'moment';
import { getChannels } from '../../actions/channel';
import { useHistory } from 'react-router-dom';
import { getChannelChats } from '../../actions/channelchat';
import CreateChannelForm from '../../components/channel/channelForm';
import { useTheme, useMediaQuery } from '@material-ui/core';

const first_name = isAuth() && isAuth().first_name;
const last_name = isAuth() && isAuth().last_name;
const email = isAuth() && isAuth().email;
const id = isAuth() && isAuth()._id;



const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"30px 10px 30px 10px",
     // minHeight:"80vh",
     // backgroundColor:'#01264c!important'
   },
   icon:{
     color:"#76ff03"
   },
   chatDisplay:{
   padding:"10px 10px 10px 10px",
   overflowY: 'scroll',
   minHeight:"60vh",
   maxHeight:"60vh"
 },
time:{
  fontSize:"10px",
  color:"grey"
},
button:{
  textTransform: "none",
  backgroundColor:"#3f51b5",
  width:"100%",
  fontWeight:800,
  height:"40px",
  color:"white",
  fontSize:"15px",
  '&:hover': {
            backgroundColor:"#3f51b5"
      },
},
 channelName:{
   color:"black",
 },
 senderName:{
   fontSize:"15px",
   fontWeight:500,
   fontFamily:"sans-serif",
   paddingTop:"4px",
   lineHeight:"1.0"
 },
 message:{
   fontSize:"14px",
   fontFamily:"sans-serif",
   padding:"6px 3px 6px 3px",
   backgroundColor:"rgb(107 116 162 / 4%)"
 },
 sendmsg:{
   [theme.breakpoints.down("xs")]:{
      position:"fixed",
      bottom:"0%",
      left:"15%",
      right:"0%",
   },
   [theme.breakpoints.up("sm")]:{
      position:"fixed",
      bottom:"0%",
      left:"15%",
      right:"4%",
   },
   [theme.breakpoints.up("md")]:{
      position:"fixed",
      bottom:"4%",
      left:"18%",
      right:"25%",
   },
   zIndex:10,
   backgroundColor:"white",
   padding:"10px"
 },
 channelName:{
   padding:"1px"
 }
}));


const Chats = ({ match: { params: { channel } }, match: { url }, location }) => {
  const token = getCookie("token");
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:961px)');


  var messageContainer = React.useRef();
  const [online, setOnline] = React.useState();
  const [typing, setTyping ] = React.useState({ status: false, msg: "" });
  const [msg, setMsg] = React.useState ({  message: "", senderName: "", senderEmail: "", senderId: "", timestamp:"", channelId:"" });
  const [chats, setChats] = React.useState([]);
  const [channels, setChannels] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  function getChannelId(term) {
       return term.search.split("").slice(4).join("");
  }

  React.useEffect(() => {
    socket.emit("join", { room: getChannelId(location) });

    socket.on("connection", (response) => {
        setOnline(response.online);
    })
    socket.on("disconnected", (response) => {
        setOnline(response.online);
    })

    socket.emit("urlchanged", { url });
    socket.on("urlchanged", (response) => {
        setOnline(response.online);
    })

    socket.on("receiveMessage", (msg) => {
       setChats((prev) => [...prev, msg.msg.msg ]);
    })

    socket.on("typingResponse", (msg) => {
        setTyping({ status: true, msg: msg.msg });
        setTimeout(() => {
          setTyping({ status: false, msg: "" });
        }, 1000)
    });

    socket.on("newJoined", (val) => {
      console.log(val)
    })
  }, [])

  React.useEffect(() => {
   getChannels(id)
     .then((value) => {
       setChannels(value.channels)
     })
     .catch((err) => {
       console.log(err)
     })
  }, [reload])

  React.useEffect(() => {
    messageContainer.scrollIntoView({ behavior: "smooth" })
  }, [chats])

  React.useEffect(() => {
     getChannelChats(getChannelId(location))
       .then((value) => {
         setChats(value)
       })
       .catch((err) => {
         console.log(err)
       })
  }, [url])


  const currentTab = path => {
     if(path === history.location.pathname){
       return true;
     }
     return false;
  }



const onlineList = () => {
     return online && online.map((user, i) => {
       return <div key={i}>
                <Grid container justify="flex-start" spacing={1}>
                  <Grid item>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{user.first_name + " " + user.last_name}</Typography>
                  </Grid>
                </Grid>
              </div>
     })
}

const handleSubmit = (e) => {
    e.preventDefault();
    if(msg.message.length == 0) return;
    socket.emit("sendMessage", { msg }, {room: getChannelId(location) });
    setChats([...chats, msg]);
    setMsg({...msg,
      message: "",
      senderName: "",
      senderEmail: "",
      senderId: "",
      channelId: "",
      timestamp: ""
    });
}

const handleChange = (e) => {
    socket.emit("typing", { first_name,last_name, email, senderId:id}, {room:getChannelId(location)})
    setMsg({...msg, message: e.target.value, senderName: first_name + " " + last_name, senderId: id, senderEmail: email, channelId: getChannelId(location), timestamp: new Date() });
}

const channelsList = channels.map((item, i) => {
      return <div key={i}>
              <ListItem
                  selected={currentTab(`/chats/${item.channel_name}`)}
                  button
                  onClick={() => history.push(`/chats/${item.channel_name}?id=${item._id}`)}>
                 <ListItemText className={classes.channelName} primary={`#${item.channel_name}`} alignItems="center"/>
               </ListItem>
            </div>
})

const chatsList = chats.map((item, i) => {
  return  <div key={i}>
             <Grid container justify="flex-start" spacing={2}>
               <Grid item xs={3} md={1} sm={2}>
                  <Grid container justify="center">
                    <img src="/user.png" width={45} height={45} />
                  </Grid>
               </Grid>
               <Grid item xs={9} md={9} sm={10}>
                  <Grid container justify="flex-start">
                    <Grid item xs={12} md={2} sm={3}>
                      <Typography variant="body1" className={classes.senderName}>{item.senderName}</Typography>
                    </Grid>
                    <Grid item xs={12} md={10} sm={9}>
                     <Typography className={classes.time} variant="caption">{moment(item.timestamp).format('MMMM Do YYYY, h:mm a')}</Typography>
                    </Grid>
                  </Grid>
                 <div className={classes.message}>
                    {item.message}
                 </div>
               </Grid>
             </Grid>
          </div>
})

  return <>
           <DashboardLayout>
           <Grid container justify="center" spacing={3}>
             <Grid item sm={12} md={8} lg={9} xs={12}>
                <Typography variant="h5" align="center" className={classes.channelName}><b>#{channel}</b></Typography>
                <Card className={classes.chatDisplay} >
                {chatsList}
                <div style={{ float:"left", clear: "both" }} ref={(el) => messageContainer = el}>
                </div>
                </Card>
                <br /> <br />
                <form onSubmit={handleSubmit}>
                  <Typography variant="body1">{typing.status && typing.msg}</Typography>
                     <Grid container justify="center">
                       <Grid item sm={12} md={9} xs={12}>
                         <Card className={classes.sendmsg} >
                           <Grid item sm={12} md={12} sm={12}>
                             <TextField
                                multiline={true}
                                label="Message"
                                fullWidth
                                value={msg.message}
                                onChange={handleChange} />
                                 <br /><br />
                           </Grid>
                           <Grid item sm={12} md={12} xs={12}>
                              <Button
                                size="small"
                                className={classes.button}
                                type="submit">
                                Send
                              </Button>
                           </Grid>
                         </Card>
                       </Grid>
                   </Grid>
                </form>
             </Grid>
             {matches && <Grid item xs={12} md={3} sm={12} lg={3}>
                            <Card className={classes.cardRoot}>
                               <CreateChannelForm pageReload={(status) => setReload(status)}/>
                               <br /><br />
                                 <Typography variant="h6" align="center">Subscribed Channels</Typography>
                               {channelsList}
                            </Card>
                         </Grid>}
           </Grid>
           </DashboardLayout>
         </>
}
export default withRouter(Chats);
