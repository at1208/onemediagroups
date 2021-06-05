const PrivateChat = require("../models/private_chat_model");
const { errorHandler } = require("../utils/dbErrorHandler");

module.exports.get_private_chats = (req, res) => {
  const { receiverId } = req.params;
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

   PrivateChat.find({ $or: [
                            { $and: [{ senderId: { "$in" : [req.user._id] }, receiverId: { "$in": [receiverId]} }] },
                            { $and: [{ senderId: { "$in" : [receiverId] }, receiverId: { "$in": [req.user._id]} }] }
                           ]
                   })
        .sort({ createdAt: -1 })
        .populate("senderId", "full_name headshot_url")
        .populate("receiverId", "full_name headshot_url")
        .limit(limit)
        .skip(skip)
        .exec((err, result) => {
          if(err){
            res.status(400).json({
              error: err
            })
          }
          res.json(result.reverse());
        })
}


module.exports.read_private_message = async (req, res) => {
  const { messageId } = req.params;
  let chatMsg = await PrivateChat.findById({ _id: messageId });
  if(chatMsg){
    if(chatMsg.readStatus){
      return res.json({
         message:"Message seen already"
      })
    }
      chatMsg.readStatus = true;
      chatMsg.save((err, result) => {
         if(err){
           return res.status(400).json({
             error: err
           })
         }
         return res.json({
           message:"Message read successfully"
         })
      })
  }else{
    return res.status(404).json({
      error:"Message not found"
    })
  }
}



module.exports.unread_messages = (req, res) => {
    PrivateChat.find({ $and: [{ receiverId: req.user._id }, { readStatus: false }] })
      .exec((err, result) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
         res.json({
           messages: result,
           unread_count: result.length
         })
      })
}
