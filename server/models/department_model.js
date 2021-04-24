const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const departmentSchema = mongoose.Schema({
    department_name:{
        type:String,
        lowercase:true,
        trim:true,
        unique:true,
        required:true
    },
    department_head:{
        type:ObjectId,
        ref:"Employee",
    },
    del_flag:{
      type:Boolean,
      default:false
    }
}, { timestamps:true })

module.exports = mongoose.model('Department', departmentSchema);
