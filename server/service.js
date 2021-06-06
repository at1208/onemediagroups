const Employee = require("./models/employee_model");
const ChannelChat = require("./models/channel_chat_model");
const PrivateChat = require('./models/private_chat_model');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
const jwt = require("jsonwebtoken");


var onlineUsers = [];

async function getOnlineUser(id){
     return await Employee.findById({ _id: id }).select("full_name email headshot_url");
}


async function saveChat(msg){
  let result;
  try {
      result = await ChannelChat(msg.msg).save();
      return result;
  } catch (e) {
    return e
  }
}

async function savePrivateChat(msg){
  let result;
  try {
      result = await PrivateChat(msg).save();
      return result;
  } catch (e) {
    return e
  }
}

io.use(function(socket, next){
  if(socket.handshake.auth && socket.handshake.auth.token){
    jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  }
  else {
    next(new Error('Authentication error'));
  }
})
.on('connection', async function(socket) {

           let checkForOnlineUser = onlineUsers.filter((val) => val._id === socket.decoded._id);
           if(checkForOnlineUser.length === 0){
             let user = await getOnlineUser(socket.decoded._id);
             onlineUsers.unshift({ _id: socket.decoded._id,
                                   socketId: socket.id,
                                   full_name: user.full_name,
                                   headshot_url: user.headshot_url,
                                   email: user.email
                              })
           }

      socket.on("disconnect", (e) => {
            onlineUsers = onlineUsers.filter((val) => val._id !== socket.decoded._id);
            io.emit("online", { onlineUsers });

      })

      socket.on('join', (params) => {
          socket.join(params.room);
      });

      // socket.to(params.room).emit("newJoined", { msg: "Someone joined"});

      socket.on("sendPrivateMsg", async (msg) => {
        let privateMsg = await savePrivateChat(msg.msg);
        msg.msg._id = privateMsg._id
        console.log("Receiver:", msg.msg.receiverSocketId);
        console.log("Online users:", onlineUsers)
        io.to(msg.msg.receiverSocketId).emit("receivePrivateMsg", { msg });
      })

      socket.on("privateTyping", (data, params) => {
        socket.to(params.socketId).emit("privateTypingResponse", { msg: `Typing...`})
      })

      socket.on("urlChanged", (url) => {
        socket.emit("urlChanged", { onlineUsers })
      })

      socket.on("sendMessage", async (msg, params) => {
         await saveChat(msg);
         socket.to(params.room).emit("receiveMessage", {msg});
      })

      socket.on("typing", (data, params) => {
        socket.to(params.room).emit("typingResponse", { msg: `${data.first_name + " " + data.last_name} is typing...`})
      })

     io.emit("connection", { onlineUsers });

});

module.exports = { app,io,server }
