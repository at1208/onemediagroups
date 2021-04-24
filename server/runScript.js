const Channel = require("./models/channel_model");
const Employee = require("./models/employee_model");
const bcrypt = require('bcrypt');

(async () => {
  let generalChannel = await Channel.findOne({ channel_name: "general" });
  if(!generalChannel){
    generalChannel = await Channel({ channel_name: "general" }).save()
  };

  let adminUser = await Employee.findOne({ email: "admin" });
  if(!adminUser){
    adminUser = await Employee({  employee_id: "admin",
                                  first_name:"Admin",
                                  last_name:"Ji",
                                  email: "admin",
                                  gender:"MALE",
                                  role:"ADMIN",
                                  date_of_joining: new Date(),
                                  phone_number:"admin",
                                  isActive:true,
                                  status:"JOINED",
                                  channels:[generalChannel._id]
                                }).save();
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(process.env.ADMIN_PASSWORD, salt, async function(err, hashedPassword) {
          await Employee.findByIdAndUpdate({_id: adminUser._id}, { password: hashedPassword}, { new: true })
        });
     });

      let channel = await Channel.findOneAndUpdate({ channel_name: "general" }, { members: [adminUser._id], admins: [adminUser._id]}, { new:true});
  }

  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(process.env.ADMIN_PASSWORD, salt, async function(err, hashedPassword) {
        await Employee.findByIdAndUpdate({ _id: adminUser._id}, { password: hashedPassword}, { new: true })
      });
   });
})()
