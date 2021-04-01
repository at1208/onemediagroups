const mongoose = require("mongoose");

const holidaySchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        unique:true
    },
    day:{
        type:String,
        default:null
    },
    del_flag:{
      type:Boolean,
      default:false
    }
}, {timestamps:true})

module.exports = mongoose.model('Holiday', holidaySchema);
