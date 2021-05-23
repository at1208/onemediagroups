const Employee = require("../models/employee_model")

module.exports.check_permission = (req, res, next) => {
   const {moduleType, permission} = req.params;
   if(req.profile.permission[moduleType][permission]){
      next()
   }else {
    res.status(403).json({
      error:"Access denied. You're not allowed"
    })
   }
}
