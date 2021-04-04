const Channel = require("../models/channel_model");
const Employee = require('../models/employee_model');
const { errorHandler } = require("../utils/dbErrorHandler");

module.exports.create_channel = async (req, res) => {
  const { channel_name,admins, members } = req.body;
  let newChannel;
     try {
          newChannel = await Channel({ channel_name, members, admins }).save();
          if(newChannel){
            for(id of members){
              const employee = await Employee.findById({ _id: id });
              if(employee) employee.channels.push(newChannel._id);
              await employee.save()
            }
          }
          res.json({
            message:"New channel created successfully"
          });

     } catch (e) {
        return res.status(400).json({
          error: errorHandler(e)
        })
     }
}


module.exports.get_channels_by_user = async (req, res) => {
  const { userId } = req.params;
  if(!userId) return res.status(422).json({ error: "UserId is required"})
  try {
     let channels = await Employee.findById({ _id: userId }).select("channels").populate("channels","channel_name");
     if(channels.length == 0) return res.status(404).json({ error: "Channels doestn't exists"});
     res.json(channels)
  } catch (e) {
    res.status(400).json({
      error: errorHandler(e)
    })
  }

}
