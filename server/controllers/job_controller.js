const Job = require("../models/job_model");
const { errorHandler } = require("../utils/dbErrorHandler");

module.exports.create_job = async(req, res)=>{
    const {
        job_id,
        job_title,
        for_department,
        apply_by,
        description,
        job_type,
        vacancy,
        } = req.body
    const {posted_by} = req.params;
    
    await Job({
            posted_by:posted_by,
            job_id,
            job_title,
            for_department,
            apply_by,
            description,
            job_type,
            status,
            vacancy,
            filled,
            applicants
    }).save((err, job)=>{
        if(err) 
            return res.status(400).json({
                error : errorHandler
            })
        else 
            return res.status(200).json({
                    message:"Job created successfully",
                    job : job
                })
            })
}

module.exports.update_job=async(req, res)=>{
    const {
        job_title,
        for_department,
        apply_by,
        description,
        job_type,
        status,
        vacancy,
        filled,
    } = req.body;
    const {_id} = req.params;
    Job.findByIdAndUpdate({_id}, 
        {job_title:job_title,
         for_department:for_department,
         apply_by:apply_by,
         description:description,
         job_type:job_type,
         status:status,
         vacancy:vacancy,
         filled:filled
        },(err,result )=>{
        if(err) 
            return res.status(400).json({
                error : err
            })
        else 
            return res.status(200).json({
                    message:"Job updated successfully",
                    job : result
                })
            })
}

module.exports.get_all_jobs=async(req, res)=>{
    const {posted_by} = req.params;
    Job.find({posted_by:posted_by}, (err, result)=>{
        if(err) 
            return res.status(400).json({
                error : err
            })
        else 
            return res.status(200).json({
                 jobs : result
                })
            })
}

module.exports.get_particular_job = async(req, res)=>{
    const {_id} = req.params;
    Job.findById({_id}, (err, result)=>{
        if(err) 
            return res.status(400).json({
                error : err
            })
        else 
            return res.status(200).json({
                    job : result
                })
        })
}

module.exports.delete_job = async(req, res)=>{
    const {_id} = req.params;
    Job.findByIdAndDelete({_id}, (err, result)=>{
        if(err) 
            return res.status(400).json({
                error : err
            })
        else 
            return res.status(200).json({
                    message:"deleted job successfully"
                })
        })
}


