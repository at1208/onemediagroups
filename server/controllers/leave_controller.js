const LeaveType  =  require('../models/leave_type_model');
const { errorHandler } = require("../utils/dbErrorHandler");

module.exports.create_leave_type= async(req, res) =>{
        const {
            leave_type, 
            leave_limit
            } = req.body;

        await LeaveType({
            leave_type,
            leave_limit
            }).save((err, leave_type)=>{
                if(err) 
                    return res.status(400).json({
                        error : errorHandler
                    })
                else 
                    return res.status(200).json({
                            message:"Leave created",
                            leave_type: leave_type
                        })
                    })
                }

       
// module.exports.update_leave_type = async(req, res) => {
//     const { _id } = req.params;
//     const { leave_type, leave_limit} = req.body;
//     await LeaveType.findByIdAndUpdate({ _id }, {leave_type:leave_type, leave_limit:leave_limit}, (err, leave_type) => {
//             if(err){
//                 return res.status(400).json({
//                 error: err
//                 })
//             }
//             res.status(200).json({
//                 message: "leave type modified successfully.",
//                 designation:leave_type
//             })
//     })
// }
                
module.exports.all_leave_types = (req, res) => {
    LeaveType.find({ del_flag: false })
    .exec((err, result) => {
        if(err){
        return res.status(400).json({
        error:err
        })
    }
    res.status(200).json({
            leave_types: result
        })
    })
}
                
module.exports.single_leave_type = (req, res) => {
const { _id } = req.params;
    LeaveType.findById({ _id })
    .exec((err, result) => {
        if(err){
            return res.status(400).json({
            error:err
            })
        }
        res.status(200).json({
            leave: result
        })
    })
}
                
module.exports.delete_leave_type = (req, res) => {
    const { _id } = req.params;
    LeaveType.findByIdAndUpdate({ _id }, { del_flag: true }, { new:true })
    .exec((err, result) => {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            message:"leave type deleted successfully"
        })
    })
}
    



