const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const activitySchema =  mongoose.Schema({
    who_performed:{
        type:ObjectId,
        ref:"Employee",
        required:true
    },
    performed_on:{
        type:ObjectId,
        ref:{
            type:ObjectId,
            default:null
        }
    },
    description:{
        type:String,
        default:null
    },
    priority:{
        type:String,
        enum:[
            "low",
            "medium",
            "high"
        ],
        default:"low"
    }
}, {timestamps:true});

module.exports = mongoose.model('Activity', activitySchema);
