const JobApplicant = require("../models/job_applicant_model");
const { errorHandler } = require("../utils/dbErrorHandler");

module.exports.apply_for_job = async(req, res)=>{
    const {job_id} = req.params;
    const {applicant_name,
            email,
            resume,
            phone_number} = req.body;
    await JobApplicant({
        job_id:job_id,
        applicant_name:applicant_name,
        email:email,
        resume:resume,
        phone_number:phone_number
    }).save((err, job)=>{
        if(err) 
            return res.status(400).json({
                error : errorHandler
            })
        else 
            return res.status(200).json({
                    message:"Job applied successfully",
                    job : job
                })
            })
}

module.exports.admin_update_job_status=async(req, res)=>{
    const {_id} = req.params;
    const {status} = req.body;

    await JobApplicant.findByIdAndUpdate({_id}, {status:status}, (err, result)=>{
            if(err) 
                return res.status(400).json({
                    error : err
                })
            else 
                return res.status(200).json({
                        message:"Job status updated successfully",
                    })
            })
}