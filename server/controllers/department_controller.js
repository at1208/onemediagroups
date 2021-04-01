const Department = require("../models/department_model");
const { errorHandler } = require("../utils/dbErrorHandler");

module.exports.create_department = async (req, res) => {
   const { departmentName, department_head } = req.body;
   await Department({ department_name: departmentName, department_head })
        .save((err, result) => {
          if(err){
            return res.status(400).json({
              error:  errorHandler(err)
            })
          }
          res.status(200).json({
            message:"New department created successfully."
          })
      })
}


module.exports.update_department = (req, res) => {
    const { _id } = req.params;
    const { department_name, department_head } = req.body;
    Department.findOne({ _id })
     .exec((err, department) => {
       if(err){
         return res.status(400).json({
           error: err
         })
       }
       if(department_name){
         department.department_name = department_name;
       }
       if(department_head){
         department.department_head = department_head;
       }
      department.save((err, result) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        res.status(200).json({
          message: "Department details updated successfully."
        })
      })
     })
}

module.exports.all_department = (req, res) => {
    Department.find({ del_flag: false })
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error:err
        })
      }
      res.status(200).json({
         departments: result
      })
    })
}

module.exports.single_department = (req, res) => {
  const { _id } = req.params;
    Department.findById({ _id })
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error:err
        })
      }
      res.status(200).json({
         department: result
      })
    })
}

module.exports.delete_department = (req, res) => {
  const { _id } = req.params;
  Department.findByIdAndUpdate({ _id }, { del_flag: true }, { new:true })
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     }
     res.status(200).json({
       message:"Department delete successfully"
     })
   })
}
