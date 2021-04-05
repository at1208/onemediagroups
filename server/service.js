const Employee = require("./models/employee_model");
const ChannelChat = require("./models/channel_chat_model");
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
const jwt = require("jsonwebtoken");


// var online = [];
// async function getOnlineUser(id){
//      return await Employee.findById({ _id: id }).select("first_name last_name email");
// }


async function saveChat(msg){
  let result;
  try {
      result = await ChannelChat(msg.msg).save();
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
      // let onlineUser = online.some(val => val._id == socket.decoded._id);
      // if(!onlineUser) online.unshift(await getOnlineUser(socket.decoded._id));

      socket.on("disconnect", () => {
        // online = online.filter(item => item._id != socket.decoded._id);
        // io.emit("disconnected", {online})
      });

      // socket.on("urlchanged", (url) => {
      //   socket.emit("urlchanged", {online})
      // })

      socket.on('join', (params) => {
          socket.join(params.room);
      });

      // socket.to(params.room).emit("newJoined", { msg: "Someone joined"});


      socket.on("sendMessage", async (msg, params) => {
         await saveChat(msg);
         socket.to(params.room).emit("receiveMessage", {msg});
      })

      socket.on("typing", (data, params) => {
        socket.to(params.room).emit("typingResponse", { msg: `${data.first_name + " " + data.last_name} is typing...`})
      })

    // io.emit("connection", {online});
});

module.exports = { app,io,server }
