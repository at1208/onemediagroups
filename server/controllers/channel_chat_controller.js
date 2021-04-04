const ChannelChat = require("../models/channel_chat_model");
const { errorHandler } = require("../utils/dbErrorHandler");

module.exports.create_channel_chat = async (req, res) => {
  const  { message, senderId, channelId, timestamp } = req.body;
     try {
        await ChannelChat({ message, senderId, channelId, timestamp }).save();
          res.json({
            message:"New message is created successfully"
          });
     } catch (e) {
        return res.status(400).json({
          error: e
        })
     }
}

module.exports.get_channel_chats = async (req, res) => {
   const { channelId } = req.params;
   let limit = req.body.limit ? parseInt(req.body.limit) : 10;
   let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    try {
       let chats = await ChannelChat.find({ channelId })
                         .populate('senderId', 'first_name last_name')
                         .sort({ createdAt: 1 })
                         // .skip(skip)
                         // .limit(limit)
  if(!chats) return res.status(404).json([]);
  const chatList =  chats.map((item, i) => {
       return {
           channelId: item.channelId,
           message: item.message,
           senderEmail: item.senderId.email,
           senderName: item.senderId.first_name + " " + item.senderId.last_name,
           timestamp: item.timestamp
        }
     })
     res.json(chatList);
    } catch (e) {
      res.status(400).json({
        error:e
      })
    }
}
