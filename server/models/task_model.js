const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskSchema = mongoose.Schema({
      task_id: {
        type: String,
        unique:true,
        required:true,
        trim:true
      },
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
        enum:["Open", "Blog Review", "Done", "Closed"],
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
      },
      attachments:[{
        filename:String,
        url:String
      }]
},{ timestamps: true })

module.exports = mongoose.model("Task", taskSchema);
