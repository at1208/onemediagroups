const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskSchema = mongoose.Schema({
      project_id:{
        type:ObjectId,
        ref:"Project",
        required:true
      },
      assignee:{
        type:ObjectId,
        ref:"Employee",
        required:true
      },
    follower:{
        type:ObjectId,
        ref:"Employee",
        required:true
      },
      owner:{
        type:ObjectId,
        ref:"Employee",
        required:true
      },
      title:{
        type:String,
        min:5,
        max:80,
        required:true
      },
      description:{
        type:String,
        min:5,
        max:320
      },
      status:{
        type:String,
        enum:["Open", "Closed", "Done"],
        default:"Open"
      },
      comments:[{
        comment:String,
        commented_by:{
          type:ObjectId,
          ref:"Employee"
        }
      }],
      deadline:{
        type:Date
      },
      del_flag:{
        type:Boolean,
        default:false
      }
},{ timestamps: true })

module.exports = mongoose.model("Task", taskSchema);
