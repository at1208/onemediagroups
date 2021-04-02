import React from 'react';
import { withRouter } from 'react-router-dom';
import DashboardLayout from '../../components/layout/dashboardLayout';
import socket from '../../utils/socketio';
import { Grid, Card, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { getCookie, isAuth } from '../../actions/auth';
import moment from 'moment';

const first_name = isAuth() && isAuth().first_name;
const last_name = isAuth() && isAuth().last_name;
const email = isAuth() && isAuth().email;
const id = isAuth() && isAuth()._id;


const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"30px 10px 30px 10px",
     minHeight:"80vh"
   },
   icon:{
     color:"#76ff03"
   },
   chatDisplay:{
   overflowY: 'scroll',
   minHeight:"60vh",
   maxHeight:"60vh"
 },
time:{
  color:"grey"
}
}));


const Chats = ({ match: { params: { channel } }, match: { url }}) => {
  const token = getCookie("token");
  const classes = useStyles();
  var messageContainer = React.useRef();

  const [online, setOnline] = React.useState();
  const [typing, setTyping ] = React.useState({ status: false, msg: "" });

  const [msg, setMsg] = React.useState ({  message: "", senderName: "", senderEmail: "", senderId: "", timestamp:"", channelId:"" });

  const [chats, setChats] = React.useState([]);

  React.useEffect(() => {
    socket.emit("join", { room: channel });

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
  messageContainer.scrollIntoView({ behavior: "smooth" })
}, [chats])

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
    socket.emit("sendMessage", { msg }, {room: channel });
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
    socket.emit("typing", { first_name,last_name, email, senderId:id}, {room:channel})
    setMsg({...msg, message: e.target.value, senderName: first_name + " " + last_name, senderId: id, senderEmail: email, channelId: channel, timestamp: new Date() });
}

const chatsList = chats.map((item, i) => {
  return  <div key={i}>
             <Grid container justify="flex-start" spacing={3}>
               <Grid item xs={3} md={1} sm={2}>
                  <img src="/user.png" width={50} height={50} />
               </Grid>
               <Grid item xs={9} md={11} sm={10}>
                  <Grid container justify="flex-start" spacing={1}>
                    <Grid item xs={12} md={2} sm={3}>
                      <Typography variant="body1">{item.senderName}</Typography>
                    </Grid>
                    <Grid item xs={12} md={10} sm={9}>
                     <Typography className={classes.time} variant="caption">{moment(item.timestamp).format('MMMM Do YYYY, h:mm a')}</Typography>
                    </Grid>
                  </Grid>
                 <div>
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
                <Card className={classes.chatDisplay}>
                {chatsList}
                <div style={{ float:"left", clear: "both" }} ref={(el) => messageContainer = el}>
                </div>
                </Card>
                <br /> <br />
                <form onSubmit={handleSubmit}>
                  <Typography variant="body1">{typing.status && typing.msg}</Typography>
                   <TextField label="Message" fullWidth value={msg.message} onChange={handleChange} />
                     <br /> <br />
                     <Grid container justify="center">
                       <Grid item sm={4} md={4} xs={12}>
                          <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            type="submit">
                            Send
                          </Button>
                       </Grid>
                   </Grid>
                </form>
             </Grid>
             <Grid item xs={12} md={4} sm={12} lg={3}>
                <Card className={classes.cardRoot}>
                   <Button
                    color="primary"
                    fullWidth
                    variant="contained">Create Channel</Button>
                </Card>
             </Grid>
           </Grid>
           </DashboardLayout>
         </>
}
export default withRouter(Chats);
