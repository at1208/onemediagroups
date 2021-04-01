const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const assetSchema = mongoose.Schema({
    asset_name:{
        type:String,
        default:null
    },
    asset_id:{
        type:Number,
        required:true
    },
    purchase_date:{
        type:Date,
        required:true
    },
    warranty_ends:{
        type:Date,
        required:true
    },
    manufacturer:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    serial_number:{
        type:String,
        required:true
    },
    supplier:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    },
    asset_user:{
        type:ObjectId,
        ref:"Employee",
        default:null    // employee not yet assigned
    },
    status:{
        type:String,
        enum:[
            "pending",
            "approved",
            "damaged",
            "deployed"
        ]
    }

}, {timestamps:true})

module.exports = mongoose.model('Asset', assetSchema);
