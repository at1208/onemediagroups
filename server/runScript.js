const Channel = require("./models/channel_model");
const Employee = require("./models/employee_model");
const bcrypt = require('bcrypt');

(async () => {
  let generalChannel = await Channel.findOne({ channel_name: "general" });
  if(!generalChannel){
    generalChannel = await Channel({ channel_name: "general" }).save()
  };

  let adminUser = await Employee.findOne({ employee_id: "admin" });
  if(!adminUser){
    adminUser = await Employee({  employee_id: "admin",
                                  first_name:"Admin",
                                  full_name:"Admin Bhai",
                                  last_name:"Buddy",
                                  email: "mailmeaktiwari@gmail.com",
                                  gender:"MALE",
                                  role:"ADMIN",
                                  date_of_joining: new Date(),
                                  phone_number:"9140283163",
                                  isActive:true,
                                  permission:{
                                    project:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    task:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    channel:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    employee:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    department:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    designation:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    domain:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    blog:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    category:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    content:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    activity:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    chat:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    },
                                    contact:{
                                      read:true,
                                      write:true,
                                      update:true,
                                      delete:true
                                    }
                                  },
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
