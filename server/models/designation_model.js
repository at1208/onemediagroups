const mongoose = require("mongoose");

const desginationSchema = mongoose.Schema({
    designation_name:{
        type:String,
        required:true,
        unique:true
    },
    del_flag:{
        type:Boolean,
        default:false
    }
}, {timestamps:true});

module.exports = mongoose.model('Designation', desginationSchema);
