const Holiday =  require("../models/holiday_model");

module.exports.create_holiday = async (req, res) => {
   const { title, date, day } = req.body;
   if(!title){
     return res.status(400).json({
       error: "Title is required"
     })
   }
   if(!date){
     return res.status(400).json({
       error: "Title is required"
     })
   }
   await Holiday({
     title,
     date,
     day
   }).save((err, holiday) => {
     if(err){
       return res.status(400).json({
         error: err
       })
     }
     res.status(200).json({
       message:"New holiday created successfully."
     })
   })
}

module.exports.update_holiday = (req, res) => {
  const { _id } = req.params;
  const { title, date, day } = req.body;
  Holiday.findOne({ _id })
    .exec((err, holiday) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      if(!holiday){
        return res.status(404).json({
          error: "No holiday found with given id."
        })
      }
      res.status(200).json({
        message: "Holiday updated successfully."
      })
    })
}

module.exports.delete_holiday = (req, res) => {
  const { _id } = req.params;
  Holiday.findByIdAndUpdate({ _id }, { del_flag: true }, { new:true })
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     }
     res.status(200).json({
       message:"Holiday delete successfully"
     })
   })
}

module.exports.single_holiday = (req, res) => {
  const { _id } = req.params;
  Holiday.findById({ _id })
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error:err
        })
      }
      res.status(200).json({
         holiday: result
      })
    })
}

module.exports.all_holiday = (req, res) => {
  Holiday.find({ del_flag: false })
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     }
     res.status(200).json({
        holidays: result
     })
   })
}
