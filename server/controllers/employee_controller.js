const Employee = require("../models/employee_model");
const Channel = require("../models/channel_model");
const { errorHandler } = require("../utils/dbErrorHandler");
const { send_email } = require("../utils/send_email");
const formidable = require('formidable');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const fs = require('fs');
const onboard_template = require("../utils/onboard_template");
const reset_password_template = require("../utils/reset_password_template");

const pad = (number, length) => {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}


module.exports.create_employee =  async (req, res) => {
  const { first_name,
          last_name,
          role,
          date_of_joining,
          country_code,
          phone_number,
          department,
          designation,
          email,
          address,
          gender,
        } = req.body;


     if(!first_name){
       return res.status(400).json({
         error: "First name is required"
       })
     }

     if(!department){
       return res.status(400).json({
         error: "Department is required"
       })
     }

     if(!designation){
       return res.status(400).json({
         error: "Designation is required"
       })
     }

     if(!gender){
       return res.status(400).json({
         error: "Gender is required"
       })
     }

     if(!date_of_joining){
       return res.status(400).json({
         error: "Date of joining is required"
       })
     }

     if(!phone_number){
       return res.status(400).json({
         error: "Phone number is required"
       })
     }

     if(!email){
       return res.status(400).json({
         error: "Email is required"
       })
     }
     date_of_joining.split("-");
     var newDate = new Date( date_of_joining[0], date_of_joining[1] - 1, date_of_joining[2]);
     const employee_id = "RT" + new Date().getFullYear() + pad(await Employee.countDocuments()+1, 4);

     const employee = new Employee();
         employee.first_name = first_name,
         employee.last_name = last_name,
         employee.full_name = first_name + " " + last_name,
         employee.address = address,
         employee.employee_id = employee_id,
         employee.role = role,
         employee.date_of_joining = newDate.getTime(),
         employee.country_code = country_code,
         employee.phone_number = phone_number,
         employee.department = department,
         employee.designation = designation,
         employee.email = email,
         employee.gender = gender

      await employee.save((err, result) => {
           if (err) {
               return res.status(400).json({
                   error:  errorHandler(err)
               });
           }

           res.status(200).json({
             message:"New employee successfully created",
             employee: result
           })
       })
}


module.exports.onboard_employee = (req, res) => {
    const { employee_id } = req.params;
    Employee.findById({ _id:employee_id })
     .exec((err, employee) => {
       if(err){
         return res.status(400).json({
           error: err
         })
       }
    const { first_name, email, _id } = employee;
    const token = jwt.sign({ first_name, _id, email }, process.env.JWT_INVITATION, { expiresIn: '7d' });

    const name = first_name
                 .toLowerCase()
                 .replace(/\w/, firstLetter => firstLetter.toUpperCase());
    let html = onboard_template({ name, token});
    // `<div style="padding-left:20px; padding-right:20px">
    //              <h1 style="text-align:center">Welcome you on board!</h1>
    //              <div style="text-align:left;">Hi ${first_name},</div>
    //              <p>
    //               Congratulations on being part of the team! The whole company welcomes you and we look forward to a successful journey with you! Welcome aboard!
    //              </p>
    //              <p>Please click on the following button to activate your acccount:</p>
    //              <div style= "text-align:center; padding:20px 20px 20px 20px;" >
    //                <a href=${process.env.CLIENT_URL}/auth/onboard/${token}>
    //                  <button style="padding:10px 30px; background:linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%); color:white; font-weight:700; border:0px; font-size:20px">
    //                    Accept invitation
    //                  </button>
    //                </a>
    //              </div>
    //              <hr />
    //              <p>This email may contain sensetive information</p>
    //            </div>`

    send_email(email, "Welcome you onboard", html)
    .then(() => {
      return res.status(200).json({
        message:"Invitation sent successfully."
      })
    })
    .catch(console.error)
     })
}

module.exports.accept_onboard_invitation = async (req, res) => {
    const { token, password } = req.body;
    const channelId = await Channel.findOne({ channel_name: "general" })

    if(!password){
      return res.status(400).json({
        error: "Password is required"
      })
    }
   if (token) {
       jwt.verify(token, process.env.JWT_INVITATION, function(err, decoded) {
           if (err) {
               return res.status(401).json({
                   error: 'Expired link'
               });
           }
           const { _id } = jwt.decode(token);
           Employee.findById(_id)
             .exec((err, result) => {
               if(err){
                 return res.status(400).json({
                   error: err
                 })
               }

               if(result.password.length >0){
                 return res.status(400).json({
                     error:"Account is activated already"
                 })
               }


             bcrypt.genSalt(10, function(err, salt) {
                 bcrypt.hash(password, salt, function(err, hashedPassword) {
                   Employee.findByIdAndUpdate({_id: result._id}, { password: hashedPassword, isActive:true, status:"JOINED", channels:[channelId._id] }, { new: true })
                     .exec((err, response) => {
                       if(err){
                         return res.status(400).json({
                           error: err
                         })
                       }
                       return res.status(200).json({
                            message: "Invitation accepted successfully"
                       })
                     })
                 });
              });
            })
       });
   } else {
       return res.json({
           message: 'Something went wrong. Try again'
       });
   }
}

module.exports.update_employee = async (req, res) => {
  const { _id } = req.params;

  const { first_name,
          last_name,
          role,
          date_of_joining,
          country_code,
          phone_number,
          department,
          designation,
          email,
          address,
          gender,
          module_visibility,
          permission
        } = req.body;

      const employee = await Employee.findById({_id});

      if(employee){
      //   if(first_name){
      //     employee.first_name = first_name;
      //   }
      //   if(last_name){
      //     employee.last_name = last_name;
      //     employee.full_name = first_name + " " + last_name;
      //   }
        if(role){
          employee.role = role;
        }
        if(date_of_joining){
           employee.date_of_joining = date_of_joining;
        }
        // if(phone_number){
        //   employee.phone_number = country_code + phone_number;
        // }
        if(department){
          employee.department = department;
        }
        if(designation){
          employee.designation = designation;
        }
        if(email){
          employee.email = email;
        }
        if(address){
          employee.address = address;
        }
        if(gender){
          employee.gender = gender;
        }
        if(permission){
          employee.permission = permission;
        }
        if(module_visibility){
          employee.module_visibility = module_visibility;
        }
        employee.save((err, result) => {
          if(err){
            return res.status(400).json({
              error: err
            })
          }
          res.json({
            message: "Employee successfully updated"
          })
      })
   } else{
     res.status(404).json({
       error: "Employee not found"
     })
   }
}


module.exports.signin = (req, res) => {
  const { email, password } = req.body;
  if(!email){
    return res.status(400).json({
      error: "Email is required."
    })
  }
  if(!password){
    return res.status(400).json({
      error: "Password is required."
    })
  }
  //check if email exist in db. if it exist then take out the employee data
  Employee.findOne({ email })
    .exec(async (err, employee) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      if(!employee){
        return res.status(404).json({
         error: "Employee with given email does not exit."
        })
      }
      // now compare the given password with db's password
       let result = await bcrypt.compare(password, employee.password);
       if(result === false){
         return res.status(400).json({
           error: "Invalid email or password"
         })
       }else if (result === true) {
           const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
           res.cookie('token', token, { expiresIn: '7d' });
           const { _id, first_name,last_name, email, headshot_url, full_name, module_visibility } = employee;
           return res.json({
               token,
               employee: { _id, first_name, last_name, email, headshot_url, full_name, module_visibility }
           });
       }else {
         res.status(400).json({
             error: "Something went wrong."
           })
       }
    })
}


module.exports.all_employee = (req, res) => {
  Employee.find()
   .populate("department", "department_name")
   .populate("designation", "designation_name")
   .populate("channels", "channel_name")
   .select("first_name last_name department designation status email gender phone_number address role employee_id date_of_joining full_name headshot_url")
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     }
     res.status(200).json({
        employees: result
     })
   })
}

module.exports.single_employee = (req, res) => {
  const { id } = req.params;
  Employee.findById({ _id: id })
   .populate("department", "department_name")
   .populate("designation", "designation_name")
   .populate("channels", "channel_name")
   .select("first_name last_name department designation status email gender phone_number address role employee_id date_of_joining picture full_name headshot_url module_visibility permission")
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     }
     res.status(200).json({
        employees: result
     })
   })
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET, // req.user
    algorithms: ['sha1', 'RS256', 'HS256']
});

exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id;
    Employee.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Employee not found'
            });
        }
        req.profile = user;
        next();
    });
};



exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    Employee.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'Employee with that email does not exist'
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });

        // email
        const html = reset_password_template({ token });
        // populating the db > user > resetPasswordLink
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ error: errorHandler(err) });
            } else {
                  send_email(email, "Password reset link", html)
                  .then(() => {
                    return res.json({
                        message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`
                    });
                  })
                  .catch(console.error)
            }
        });
    });
};

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;
     if(!newPassword){
       return res.status(422).json({
         error: "Please enter a new password."
       })
     }
    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link. Try again'
                });
            }
            Employee.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(401).json({
                        error: 'Something went wrong. Try later'
                    });
                }

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newPassword, salt, function(err, hashedPassword) {
                        const updatedFields = {
                            password: hashedPassword,
                            resetPasswordLink: ''
                        };

                        user = _.extend(user, updatedFields);
                        user.save((err, result) => {
                            if (err) {
                                return res.status(400).json({
                                    error: errorHandler(err)
                                });
                            }
                            res.json({
                                message: `Great! Now you can login with your new password`
                            });
                        });
                    });
                 });
            });
        });
    }
};

module.exports.contact_number = (req, res) => {
    //role: EMPLOYEE / CONTRACTOR/ INTERN
    var query = {};
    var payload = req.body;
    if (payload.role) query.role = {$in : payload.role};

   Employee.find(query)
     .populate("designation", "designation_name")
     .select("phone_number first_name last_name email")
     .exec((err, result) => {
         if(err){
           return res.status(400).json({
             error: err
           })
         }
         res.json(result)
     })
}


module.exports.filter_employee = (req, res) => {
   // query = { full_name: "", designation:"", department:"", status:"" }

var query = {};
var payload = req.body;

if (payload.full_name) query.full_name = {$in : payload.full_name};
if (payload.designation) query.designation = {$in : payload.designation};
if (payload.department) query.department = {$in : payload.department};
if (payload.status) query.status = {$in : payload.status};
// query.del_flag = {$in : false};


    Employee.find(query)
    .populate("designation", "designation_name")
    .populate("department", "department_name")
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.json(result)
    })
}

module.exports.update_profile_picture = (req, res) => {
  const { id } = req.params;
  const { url } = req.body;

  Employee.findByIdAndUpdate({ _id: id }, {headshot_url: url}, { new: true })
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error: err
       })
     }
     res.json(result)
   })
}


module.exports.check_module_permission = (req, res) => {
  const { moduleType, permission } = req.params;
  Employee.findById(req.user._id)
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.json(result.permission[moduleType][permission])
    })
}
