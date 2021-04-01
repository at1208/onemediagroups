const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const leaveRequest =  mongoose.Schema({
    requested_by:{
        type:ObjectId,
        ref:"Employee"
    },
    from:{
        type:Date,
        required:true,
    },
    to:{
        type:Date,
        required:true
    },
    leave_type:{
        type:ObjectId,
        ref :"LeaveType",
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    proof:{
        data:Buffer,
        content_type:String,
    },
    // request status incomplete means that person needs to upload documents 
    // or some else is needed
    request_status:{
        type:String,
        enum:[
            "Accepted",
            "Rejected",
            "Pending",
            "Incomplete"
        ],
        default:"Pending"
    },

}, {timestamps:true});

module.exports = mongoose.model('LeaveRequest', leaveRequest);