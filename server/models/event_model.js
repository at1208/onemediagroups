const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const eventSchema = mongoose.Schema({
      event_name:{
        type:String,
        max:40,
        required:true
      },
      event_date:{
        type:Date,
        required:true
      },
      description:{
        type:String,
        max:300
      },
      host_by:{
        type:ObjectId,
        ref:"Employee"
      },
      venue:{
        type:String,
      },
      time:{
        start:{
          type:Date
        },
        end:{
          type:Date
        }
      },
      audience:[{
        type:ObjectId,
        ref:"Employee"
      }],
      del_flag:{
        type:Boolean,
        default:false
      }
}, {timestamps:true})

module.exports = mongoose.model("Event", eventSchema);
