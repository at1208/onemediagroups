const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const bloguserSchema = new mongoose.Schema({
     name:{
       type:String,
       required:true
     },
     picture:{
       type:String,
       required:true
     },
     email:{
       type:String,
       unique:true,
       required:true
     },
     domain:{
       type:ObjectId,
       ref:"Domain",
       required:true
     }
 },{ timestamps: true });

module.exports = mongoose.model('BlogUser', bloguserSchema);
