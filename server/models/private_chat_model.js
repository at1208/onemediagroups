const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const privateChatSchema = mongoose.Schema({
   message: {
     type:String,
     required:true
   },
   senderId:{
     type:ObjectId,
     ref:"Employee"
   },
   readStatus:{
     type:Boolean,
     default:false
   },
   receiverId:{
     type:ObjectId,
     ref:"Employee"
   }
}, { timestamps: true });

module.exports = mongoose.model("PrivateChat", privateChatSchema);
