const Event =  require("../models/event_model");


module.exports.create_event = async (req, res) => {
  const { event_name, event_date, description, host_by, venue, time, audience } = req.body;
  await Event({
    event_name,
    event_date,
    description,
    host_by,
    venue,
    time,
    audience
  }).save((err, task) => {
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    res.status(200).json({
      message:"New Event created successfully"
    })
  })
}

module.exports.update_event = (req, res) => {
  const { _id } = req.params;
  const { event_name, event_date, description, host_by, venue, time, audience } = req.body;

  Event.findOne({ _id })
    .exec((err, event) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      if(!event){
        return res.status(404).json({
          error: "No Event found with given task id"
        })
      }
      if(event_name){
        task.event_name = event_name;
      }
      if(event_date){
        task.event_date = event_date;
      }
      if(description){
        task.description = description
      }
      if(host_by){
        task.host_by = host_by;
      }
      if(venue){
        task.venue = venue;
      }
      if(time){
        task.time = time;
      }
      if(audience){
        task.audience = audience;
      }
      event.save((err, result) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        res.status(200).json({
          message:"Event updated successfully"
        })
      })
    })

}

module.exports.delete_event = (req, res) => {
  const { _id } = req.params;
  Event.findByIdAndUpdate({ _id }, { del_flag: true }, { new:true })
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     }
     res.status(200).json({
       message:"Event delete successfully"
     })
   })
}

module.exports.single_event = (req, res) => {
  const { _id } = req.params;
  Event.findById({ _id })
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error:err
        })
      }
      res.status(200).json({
         event: result
      })
    })
}

module.exports.all_event = (req, res) => {
  Event.find({ del_flag: false })
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     }
     res.status(200).json({
        events: result
     })
   })
}
