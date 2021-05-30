const Notification = require("../models/notification_model");

module.exports.create_notification = (req, res) => {
    const { title,
            description,
            notification_for_whom } = req.body;
      Notification({
      title,
      description,
      notification_for_whom
    }).save((err, result) => {
      if(err){
         return res.status(400).json({
          error: err
        })
      }
      res.json({
       message: "notification created"
      })
    })

}

module.exports.get_notifications = async(req, res) => {
  let result = await Notification
              .find({ $and:[{notification_for_whom: { "$in" : [req.user._id]}}, {read_by: { "$nin": [req.user._id]}}] })
              .sort({ updatedAt: -1 })
              .populate("createdBy", "full_name headshot_url")

   res.json({
     count: result.length,
     notifications: result
   })
}

module.exports.change_notification_to_seen = (req, res) => {
  const { notifyId } = req.params;
    Notification.findById({_id: notifyId})
       .exec(async (err, result) => {
         if(err){
           return res.status(400).json({
             error: err
           })
         }
         let checkSeen = await result.read_by.includes(req.user._id);
         if(!checkSeen){
           result.read_by.push(req.user._id);
           await result.save();
           return res.json({
             message: "notification marked as seen."
           })
         }else {
           res.json({
             message:"message is seen already"
           })
         }
       })
}

module.exports.get_all_notifications = async (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    Notification.find({ notification_for_whom: { "$in" : [req.user._id]} })
      .skip(skip)
      .limit(limit)
      .exec((err, result) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
         res.json(result)
      })
}
