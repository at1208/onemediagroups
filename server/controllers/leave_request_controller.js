const LeaveRequest  =  require('../models/leave_request_model');
const { errorHandler } = require("../utils/dbErrorHandler");


module.exports.create_leave_request= async(req, res) =>{
        const {
            employee_id,
            from,
            to,
            leave_type,
            reason,
            proof,
            request_status
            } = req.body;

        await LeaveRequest({
            requested_by:employee_id,
            from,
            to,
            leave_type,
            reason,
            proof,
            request_status
            }).save((err, leave_request)=>{
                if(err) 
                    return res.status(400).json({
                        error : errorHandler
                    })
                else 
                    return res.status(200).json({
                            message:"Leave request created",
                            leave_request: leave_request
                        })
                    })
        }
    


// Remaingin updation of file upload after disscussion

module.exports.update_leave_request = async(req, res) => {
    const { _id } = req.params;
    const { proof} = req.body;
    await LeaveRequest.findByIdAndUpdate({ _id }), {}, (err, leave_request) => {
            if(err){
                return res.status(400).json({
                error: err
                })
            }
            res.status(200).json({
                message: "leave request modified successfully.",
                leave_request:leave_request
            })
    }
}


                
module.exports.all_leave_requests = async(req, res) => {
    const {employee_id} = req.params;
    if(employee_id){
        await LeaveRequest.find({requested_by:employee_id})
            .exec((err, result) => {
                if(err){
                return res.status(400).json({
                    error:err
                })
            }
            res.status(200).json({
                    leave_requests: result
                })
            })
        }
    else{
        await LeaveRequest.find()
            .exec((err, result) => {
                if(err){
                return res.status(400).json({
                    error:err
                })
            }
            res.status(200).json({
                    leave_requests: result
                })
            })
        }
    
}
                
module.exports.delete_leave_request = (req, res) => {
    const { _id } = req.params;
    LeaveRequest.findByIdAndDelete({ _id })
    .exec((err, result) => {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            message:"leave request removed success"
        })
    })
}

module.exports.admin_update_leave_request = async(req, res)=>{
    const {leave_request_id} = req.params;
    const {request_status} = req.body;
    await LeaveRequest.findByIdAndUpdate(leave_request_id, {request_status:request_status},(err, result)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            message:"leave request updated successfully"
        })
    })
}
            
        
        
        
        



