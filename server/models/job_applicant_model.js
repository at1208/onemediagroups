const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jobApplicantSchema = mongoose.Schema({
     job_id:{
       type:ObjectId,
       ref:"Job",
       required:true
     },
     applicant_name:{
       type:String,
       max:32,
       required:true
     },
     email:{
       type:String,
       required:true
     },
     resume:{
       type:Buffer,
       content_type:String
     },
     phone_number:{
      type:String,
      required:true
     },
     status:[{
       type:String,
       enum:["Applied", "Rejected", "Interview_scheduled", "Selected"],
       default:"Applied"
     }]

}, {timestamps:true})

module.exports = mongoose.model("Job_Applicant", jobApplicantSchema);
