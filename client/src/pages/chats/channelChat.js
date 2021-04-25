import React, { useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import DashboardLayout from '../../components/layout/dashboardLayout';
import socket from '../../utils/socketio';
import { Grid, Card, TextField, Button, Typography, Divider,  Avatar, Badge  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { getCookie, isAuth } from '../../actions/auth';
import moment from 'moment';
import { getChannels, getChannelsDetails } from '../../actions/channel';
import { useHistory } from 'react-router-dom';
import { getChannelChats, readChannelChats } from '../../actions/channelchat';
import CreateChannelForm from '../../components/channel/channelForm';
import ChannelMembers from '../../components/channel/channelMembers';
import { useTheme, useMediaQuery } from '@material-ui/core';
import ReactQuill from 'react-quill';
import renderHTML from 'react-render-html';
import MessageActions from '../../components/channel/action'
import Offline from "./offline";
const first_name = isAuth() && isAuth().first_name;
const last_name = isAuth() && isAuth().last_name;
const email = isAuth() && isAuth().email;
const id = isAuth() && isAuth()._id;



const useStyles = makeStyles((theme) => ({
   cardRoot:{
     width:"100%",
     padding:"30px 10px 30px 10px",
     // minHeight:"80vh",
     // backgroundColor:'#01264c!important'
   },
   icon:{
     color:"#76ff03"
   },
   chatDisplay:{
   padding:"10px 10px 10px 10px",
      backgroundColor:"rgb(107 116 162 / 4%)",
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
   width:"100%",
   marginLeft:"10px",
   fontFamily:"sans-serif",
   // paddingLeft:"2%",
   // padding:"6px 3px 6px 3px",
   // backgroundColor:"rgb(107 116 162 / 4%)"
 },
 singleMessage:{
  // margin:"3px 3px 3px 3px",
   padding:"10px",
   margin:"10px",
   backgroundColor: "white"
 },
 sendmsg:{
   [theme.breakpoints.down("xs")]:{
      position:"fixed",
      bottom:"0%",
      left:"0%",
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
   zIndex:1,
   backgroundColor:"white",
   padding:"10px"
 },
 channelName:{
   padding:"1px"
 },
 singleMessageNotReadYet:{
   backgroundColor:"#fffaea",
   padding:"10px",
   margin:"10px",
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
  const [msg, setMsg] = React.useState ({  message: "", senderName: "", senderEmail: "", senderId: "", timestamp:"", channelId:"", readBy: [] });
  const [chats, setChats] = React.useState([]);
  const [channels, setChannels] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [connected, setConnected] = React.useState(true);
  const [channelMembers, setChannelMembers] = React.useState();

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

    // socket.on(id, (data) => {
    //   setChannels(data.unread)
    // })

    // socket.on("private", (unread) => {
    //   console.log(unread)
    //    setChannels(unread);
    // })

    socket.on("typingResponse", (msg) => {
        setTyping({ status: true, msg: msg.msg });
        setTimeout(() => {
          setTyping({ status: false, msg: "" });
        }, 2000)
    });

    socket.on("newJoined", (val) => {
      console.log(val)
    })

  }, [])

  React.useEffect(() => {
   getChannels(id)
     .then((value) => {
       setChannels(value)
     })
     .catch((err) => {
       console.log(err)
     })
  }, [reload, location])

  React.useEffect(() => {
    messageContainer.scrollIntoView();
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

  React.useEffect(() => {
    getChannelsDetails(getChannelId(location))
      .then( response => {
         setChannelMembers(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


setInterval(() => {
  setConnected(socket.connected)
}, 10000)

  const currentTab = path => {
     if(path === history.location.pathname){
       return true;
     }
     return false;
  }

  const defaultProps = {
    color: 'secondary'
  };



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
      readBy:"",
      senderId: "",
      channelId: "",
      timestamp: ""
    });
}

const handleChange = (e) => {
    socket.emit("typing", { first_name,last_name, email, senderId:id}, {room:getChannelId(location)})
    setMsg({...msg, message: e, senderName: first_name + " " + last_name, senderId: id, senderEmail: email, channelId: getChannelId(location), timestamp: new Date(), readBy: [] });
}


const channelsList = channels.map((item, i) => {
      return <div key={i}>
              <ListItem
                  selected={currentTab(`/chats/${item.channel_name}`)}
                  button
                  onClick={() => history.push(`/chats/${item.channel_name}?id=${item._id}`)}>
                  <Grid container>
                    <Grid item xs={10} sm={10} md={10} className={classes.channelName}>
                      <Typography variant="body1">{`#${item.channel_name}`}</Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2}>
                     <Badge badgeContent={item.unread} {...defaultProps} />
                    </Grid>
                  </Grid>
               </ListItem>
            </div>
})


async function readChat(chatId, userId){
      chatId && await readChannelChats(chatId, userId)
}

const chatsList = chats.map((item, i) => {
      if(!(item && item.readBy && item.readBy.includes(id))){
         readChat(item._id, id)
      }
  return  <div key={i} className={classes.singleMessage}>
             <Grid container justify="flex-start" spacing={2}>
               <Grid item xs={3} md={1} sm={2}>
                  <Grid container justify="flex-start">
                    <Avatar alt={item.senderName} src=" " width={40} height={40} />
                  </Grid>
               </Grid>
               <Grid item xs={8} md={10} sm={9}>
                  <Grid container justify="flex-start">
                    <Grid item xs={12} md={12} sm={12}>
                      <Typography variant="body1" className={classes.senderName}>{item.senderName}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                     <Typography className={classes.time} variant="caption">{moment(item.timestamp).format('MMMM Do YYYY, h:mm a')}</Typography>
                    </Grid>
                  </Grid>
               </Grid>
               <Grid item xs={1} md={1} sm={1}>
                  <Grid container justify="flex-end">
                    <MessageActions />
                  </Grid>
               </Grid>
               <div className={classes.message}>
                  {renderHTML(item.message)}
               </div>
             </Grid>
          </div>
})




 function apiPostNewsImage(img) {
          return 'https://scontent.fdel1-2.fna.fbcdn.net/v/t1.6435-9/88339928_553781082162452_485602196625293312_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=PdNmWOFS-J0AX_3f440&_nc_ht=scontent.fdel1-2.fna&oh=1ad2b4a3c414c722c3c9e95636179cd2&oe=60A560DC'
        // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
    }

    function imageHandler() {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('image', file);

            // Save current cursor state
            const range = this.quill.getSelection(true);

            // Insert temporary loading placeholder image
            this.quill.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);

            // Move cursor to right side of image (easier to continue typing)
            this.quill.setSelection(range.index + 1);

            const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

            // Remove placeholder image
            this.quill.deleteText(range.index, 1);

            // Insert uploaded image
            // this.quill.insertEmbed(range.index, 'image', res.body.image);
            this.quill.insertEmbed(range.index, 'image', res);
        };
    }


    const modules = useMemo(() => ({
      toolbar: {
          container: [
              [{ header: [1, 2, 3,4, 5, 6] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['code-block']
          ],
          handlers: {
              image: imageHandler
          }
      }
     }), [])



  return <>
           <DashboardLayout>
           <Offline status={connected} />
           <Grid container justify="center" spacing={6}>
             <Grid item sm={12} md={8} lg={9} xs={12}>
                <Typography variant="h5" align="center" className={classes.channelName}><b>#{channel}</b></Typography>

                <Card className={classes.chatDisplay}>
                {chatsList}
                <div ref={(el) => messageContainer = el}>
                </div>
                </Card>
                <Typography variant="body2" align="center">{typing.status && typing.msg}</Typography>
                <br /> <br />
                <form onSubmit={handleSubmit}>
                     <Grid container justify="center">
                       <Grid item sm={12} md={12} xs={12}>
                         <Card className={classes.sendmsg} >
                           <Grid item sm={12} md={12} sm={12}>

                           <ReactQuill
                             value={msg.message}
                             modules={modules}
                             onChange={handleChange} />

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
                               <br />
                               <ChannelMembers pageReload={(status) => setReload(status)} members={channelMembers}/>
                               <br />
                                 <Typography variant="h6" align="center">Subscribed Channels</Typography>
                               {channelsList}
                            </Card>
                         </Grid>}
           </Grid>
           </DashboardLayout>
         </>
}
export default withRouter(Chats);
