const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const employeeSchema = mongoose.Schema({
    employee_id : {
        type: String,
        unique:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name: {
        type:String,
        default:null
    },
    gender:{
        type:String,
        enum:["MALE", "FEMALE","NO"],
        required:true
    },
    role:{
        type:String,
        enum:[
            'EMPLOYEE',
            'ADMIN',
            'SUPERADMIN'
        ],
        default:'EMPLOYEE'
    },
    date_of_joining: {
        type: Date,
        required : true
    },

    phone_number:{
        type:String,
        unique:true,
        required:true,
        max:15,
    },
    department: {
        type: ObjectId,
        ref: "Department"
    },
    designation:{
        type: ObjectId,
        ref : "Designation"
    },
    // isActive:{
    //     type:Boolean,
    //     default:false
    // },
    email:{
        type:String,
        unique:true,
        default:null,
        required:true
    },
    address:{
        type:String,
        default:null
    },
    picture:{
        data:Buffer,
        content_type:String
    },
    resetPasswordLink: {
        data: String,
        default: ''
    },
    status:{
      type:String,
      enum:['INVITED', 'JOINED', 'LEFT'],
      default:"INVITED"
    },
    password:{
      type:String,
      min:4,
      max:100
    },
    channels:[{
      type:ObjectId,
      ref:"Channel"
    }]
},{ timestamps:true });

module.exports = mongoose.model('Employee', employeeSchema);
