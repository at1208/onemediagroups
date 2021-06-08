const ChannelChat = require("../models/channel_chat_model");
const { errorHandler } = require("../utils/dbErrorHandler");

module.exports.create_channel_chat = async (req, res) => {
  const  { message, senderId, channelId, timestamp } = req.body;
     try {
         await ChannelChat({ message, senderId, channelId, timestamp }).save();
          res.json({
            message:"New channel is created successfully"
          });
     } catch (e) {
        return res.status(400).json({
          error: e
        })
     }
}

module.exports.get_channel_chats = async (req, res) => {
   const { channelId } = req.params;
   // let limit = req.body.limit ? parseInt(req.body.limit) : 10;
   // let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    try {
       let chats = await ChannelChat.find({ channelId })
                         .populate('senderId', 'first_name last_name headshot_url')
                         .sort({ createdAt: 1 });
        if(!chats) return res.status(404).json([]);
        const chatList =  chats.map((item, i) => {
             return {
                 _id:item._id,
                 channelId: item.channelId,
                 readBy: item.readBy,
                 message: item.message,
                 senderEmail: item.senderId.email,
                 senderPicture: item.senderId.headshot_url,
                 senderName: item.senderId.first_name + " " + item.senderId.last_name,
                 timestamp: item.timestamp
              }
           })
           return res.json(chatList);
    } catch (e) {
      res.status(400).json({
        error:e
      })
    }
}


module.exports.read_channel_chat = async (req, res) => {
     const { chatId, userId } = req.params;
     try {
       let chat = await ChannelChat.findOne({ _id: chatId });
       if(!chat) return res.status(400).json({ error: "Chat not found"});
        let check = chat.readBy.includes(userId);
        if(!check) {
           chat.readBy.push(userId)
           await chat.save()
        }
        res.json(chat)
     } catch (e) {
       res.status(400).json({
         error: "Server error"
       })
     }
}

module.exports.get_unread_chat_count_by_channel = async (req, res) => {
     const { channelId, userId } = req.params;
     try {
        let chats = await ChannelChat.find({ channelId });
        let unreadchats = chats.filter(item => !item.readBy.includes(userId))
         res.json(unreadchats.length)
     } catch (e) {
       res.status(400).json({
         error: "Server error"
       })
     }
}
