const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const projectSchema = mongoose.Schema({
      name:{
        type:String,
        min:2,
        lowercase:true,
        max:32
      },
      domain:{
        type:ObjectId,
        ref:"Domain",
        default:null
      },
      description:{
        type:String,
        min:80,
        max:320
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
      del_flag:{
        type:Boolean,
        default:false
      }

},{ timestamps: true })

module.exports = mongoose.model("Project", projectSchema);
