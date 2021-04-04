const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const channelSchema = mongoose.Schema({
  channel_name: {
    type:String,
    max:30,
    min:2,
    lowercase:true,
    unique:true,
    required:true
  },
  admins:[{
    type:ObjectId,
    ref:"Employee"
  }],
  members:[{
    type:ObjectId,
    ref:"Employee"
  }]
}, { timestamps: true });

module.exports = mongoose.model("Channel", channelSchema);
