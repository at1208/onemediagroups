const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const projectSchema = mongoose.Schema({
      name:{
        type:String,
        min:2,
        max:32
      },
      description:{
        type:String,
        min:5,
        max:320
      },
      logo:{
        data:Buffer,
        content_type:String
      },
      team_leader:{
        type:ObjectId,
        ref:"Employee"
      },
      team_members:[{
        type:ObjectId,
        ref:"Employee"
      }],
      start_date:{
        type:Date
      },
      end_date:{
        type:Date
      },
      priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Low"
      },
      uploaded_file:{
        data:Buffer,
        content_type:String
      },
      del_flag:{
        type:Boolean,
        default:false
      }

},{ timestamps: true })

module.exports = mongoose.model("Project", projectSchema);
