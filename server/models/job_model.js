const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const jobSchema =  mongoose.Schema({
    posted_by:{
        type:ObjectId,
        ref:"Employee",
        required:true
    },

    job_id:{
        type:String,
        required:true,
        unique:true
    },

    job_title:{
        type:ObjectId,
        ref:"Designation",
        required:true
    },

    for_department:{
        type:ObjectId,
        ref:"Department",
        default:null
    },
    apply_by:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        default:null
    },
    job_type:{
        type:String,
        enum:[
            "full_time",
            "part_time",
            "intern"
        ],
        default:"full_time"
    },
    status:{
        type:String,
        enum:[
            "open",
            "filled",
            "closed"
        ],
        default:"open"
    },
    vacancy:{
        type:Number,
        default:1
    },
    filled:{
        type:Number,
        default:0
    },
    applicants:{
        type:Number,
        default:0
    }
}, {timestamps:true});

module.exports = mongoose.model('Job', jobSchema);
