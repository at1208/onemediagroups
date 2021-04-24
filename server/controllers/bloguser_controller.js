const BlogUser = require("../models/bloguser_model");
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

module.exports.signup = async (req, res) => {
   const { googleToken, domain } = req.body;
   const { name, email, picture } = jwt_decode(googleToken)

   let user = await BlogUser.find({ email })

       if(user.length){
           const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
           return res.json({
              token,
              user,
              message:"Successfully Authenticated"
           })
       }

       BlogUser({ name, email, picture, domain })
         .save((err, result) => {
           if(err){
             return res.status(400).json({
               error: err
             })
           }
           const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
           res.json({
              token,
              user: result,
              message:"Successfully Authenticated"
           })
         })
}
