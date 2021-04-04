const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const channelChatSchema = mongoose.Schema({
      message: {
        type:String,
        required:true
      },
      senderId: {
        type:ObjectId,
        ref:"Employee",
        required:true
      },
      channelId: {
        type:ObjectId,
        ref:"Channel",
        required:true
      },
      timestamp: {
        type:Date,
        required:true
      }
}, { timestamps: true });

module.exports = mongoose.model("Channel_Chat", channelChatSchema);
