import React, {useMemo, useEffect, useState} from 'react';
import { Grid, IconButton, Card, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import socket from '../../utils/socketio';
import { isAuth, getCookie } from '../../actions/auth';
import { Send } from 'react-feather';
import moment from 'moment';
import ReactQuill from 'react-quill';
import renderHTML from 'react-render-html';
import { Waypoint } from 'react-waypoint';
import Avatar from '../core/avatar';
import { getPrivateChats, readSeenMessage } from '../../actions/privateChat'



const useStyles = makeStyles((theme) => ({
    displayMessage:{
      height: "65vh",
      // backgroundImage:"url(/chatbg.svg)",
      overflowY:"scroll"
    },
    messageRoot:{
      padding:"0px 0px 0px 0px"
    },
    msg:{
      padding:"0px 0px 0px 60px",
      margin:"3px 0px",
      "& p":{
        margin:"3px"
      }
      // backgroundColor:"#e8efff"
    },
    timestamp:{
      color:"rgb(58 64 88 / 50%)",
      fontSize:"11px",
    },
    msgContainer:{
      marginBottom:"15px"
    },
    msgEditor:{
      "& .ql-editor":{
         // minHeight:"50vh",
         // letterSpacing: "-0.003em",
         // lineHeight: "32px",
         outline:"auto",
         // marginTop: "2em",
         fontSize: "16px",
         // marginBottom: "-0.46em",
         // fontStyle: "normal",
         // wordBreak: "break-word",
         // color: "rgba(41, 41, 41, 1)",
         // fontWeight: "400"
      },
      "& .ql-toolbar.ql-snow":{
        background:"transparent",
        height:"30px",
        border:"0px solid white"
      }
    }

}));


const Chat = ({ receiverId,
                onlineUsers }) => {

  const classes = useStyles();
  const token = getCookie("token")
  const userId = isAuth() && isAuth()._id;
  const userPicture = isAuth() && isAuth().headshot_url;
  const userName  = isAuth() && isAuth().full_name;
  const [chatList, setChatList] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  var [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [autoScroll, setAutoScroll] = useState(true);
  const [receiverSocketId, setReceiverSocketId] = useState();
  var messageContainer = React.useRef();

  const [msg, setMsg] = useState({
         message: "",
         senderName: "",
         senderPicture:"",
         senderId: "",
         receiverId:"",
         receiverSocketId:"",
         timestamp: ""
})

   useEffect(() => {
       socket.on("receivePrivateMsg", (receiveMsg) => {
         async function getSeen(){
           await readSeenMessage(receiveMsg.msg.msg._id, token)
         }
         getSeen();
          setChatList((prevState) => [...prevState, receiveMsg.msg.msg]);
       })
   }, [])

   useEffect(() => {
      if(autoScroll){
          messageContainer.scrollIntoView()
      }
   }, [chatList])



   useEffect(() => {
    (async () => {
       let messages = await getPrivateChats(receiverId, token);
        messages = messages.map((mssg) => {
           // async function getSeen(){
           //   await readSeenMessage(mssg._id, token)
           // }
           // getSeen();
            return {
              senderName:mssg.senderId.full_name,
              senderPicture: mssg.senderId.headshot_url,
              message: mssg.message,
              _id: mssg._id,
              timestamp: mssg.createdAt
            }
          })
       setChatList(messages)
    })()
   }, [receiverId])


 useEffect(() => {
    if(onlineUsers.length>0){
      let chatReceiver = onlineUsers.filter(online => online._id === receiverId)
      setReceiverSocketId(chatReceiver[0] && chatReceiver[0].socketId);
    }
 }, [onlineUsers])

const onEnter = async (e) => {
    setLoadMore(!loadMore);
  let loadMoreMessages =   await getPrivateChats(receiverId, token, { skip: skip, limit: limit });
  loadMoreMessages = loadMoreMessages.map((mssg) => {
      return {
        senderName:mssg.senderId.full_name,
        senderPicture: mssg.senderId.headshot_url,
        message: mssg.message,
        timestamp: mssg.createdAt
      }
    })
    setChatList([...loadMoreMessages, ...chatList])
}



  const modules = useMemo(() => ({
    toolbar: {
        container: [
           //  [{ header: [1, 2] }],
           //  ['bold',
           //   'italic',
           //   'underline',
           //   // 'strike',
           //   // 'blockquote'
           // ],
            // [{ list: 'ordered' }, { list: 'bullet' }],
            ['image','link']
        ],
        handlers: {
            image:  ""
        }
    }
   }), [])

   useEffect(() => {
     setSkip(skip = skip+limit);
   }, [loadMore])


   const handleClick = (e) => {
       e.preventDefault();
       setChatList((prevState) => [...prevState, msg]);
       if(msg.message.length === 0) return;
       socket.emit("sendPrivateMsg", { msg });
       setMsg({
         message: "",
         senderName: "",
         senderEmail: "",
         senderPicture:"",
         readBy:"",
         senderId: "",
         channelId: "",
         timestamp: ""
       });
   }



   const handleChange = (e) => {
          setMsg({
            message: e,
            senderName: userName,
            senderPicture: userPicture,
            senderId: userId,
            receiverId: receiverId,
            receiverSocketId:receiverSocketId,
            timestamp: new Date()
          })
   }

   const handleWaypointEnter = () => {
      setAutoScroll(true)
   }

   const handleWaypointLeave = () => {
      setAutoScroll(false)
   }



  function ShowChatListMessages(){
    return chatList.map((chatMsg, i) => {

        return <div className={classes.msgContainer}>
                 <Grid container className={classes.messageRoot}>
                     <Grid item sm={12} md={12} lg={12}>
                       <Grid container>
                         <Grid item>
                           <Box>
                             <Avatar name={chatMsg.senderName} src={chatMsg.senderPicture} size={32} textSize={10} />
                           </Box>
                         </Grid>
                         <Box pt={0} pl={1}>
                           <Typography variant="body2">
                             {chatMsg.senderName}
                           </Typography>
                           <Typography variant="body2" className={classes.timestamp}>
                              {moment(chatMsg.timestamp).format('MMMM Do YYYY, h:mm a')}
                           </Typography>
                         </Box>
                       </Grid>
                     </Grid>
                  </Grid>
                  <div className={classes.msg}>
                    {renderHTML(chatMsg.message)}
                  </div>
              </div>
    })
  }

  return <>
            <Grid container justify="center">
              <Grid item sm={10} md={10} xs={11} lg={10}>
                <Card className={classes.displayMessage}>
                   <Grid container justify="center">
                     <Grid>
                       <button onClick={onEnter}>
                        Load more
                       </button>
                     </Grid>
                   </Grid>
                  <ShowChatListMessages />
                  <div ref={(el) => messageContainer = el} id="scroll-message">
                    <Waypoint
                     onEnter={handleWaypointEnter}
                     onLeave={handleWaypointLeave}
                    />
                  </div>
                </Card>
              </Grid>
            </Grid>
            <br />
            <Grid container justify="center">
              <Grid item sm={9} md={9} xs={9}>
                <ReactQuill
                  fullWidth
                  value={msg.message}
                  theme="snow"
                  className={classes.msgEditor}
                  onChange={handleChange}
                  modules={modules}
                  />
              </Grid>
              <Grid item sm={2} md={1} xs={2} lg={1}>
                <Grid container justify="center">
                  <Grid item>
                     <Box pt={2}>
                     <IconButton
                       size="large"
                       onClick={handleClick}
                       className={classes.button}
                       type="submit">
                       <Send />
                     </IconButton>
                     </Box>
                  </Grid>
                </Grid>
              </Grid>

          </Grid>
         </>
}
export default Chat;
