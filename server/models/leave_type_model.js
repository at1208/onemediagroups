
const mongoose = require("mongoose");

const leaveTypeSchema = mongoose.Schema({
    leave_type:{
        type:String,
        enum:[
            "sick_leave",
            "casual_leave",
            "maternity_leave",
            "paternity_leave",
            "bereavement_leave",
            "compensatory_leave",
            "unpaid_leave",
        ],
        required:true
    },

    leave_limit:{
        type:Number,
        required:true
    },
    del_flag:{
        type:Boolean,
        default:false,
    }
}, {timestamps:true})

module.exports = mongoose.model('LeaveType', leaveTypeSchema);
