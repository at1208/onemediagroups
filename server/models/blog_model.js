const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const blogSchema = mongoose.Schema({
      title: {
        type: String,
        trim: true,
        min: 3,
        max: 400,
        required: true
      },
      slug: {
        type: String,
        unique: true,
        index: true
      },
      body: {
        type: {},
        required: true,
        min: 200,
        max: 2000000
      },
      excerpt: {
        type: String,
        max: 1000
      },
      mtitle: {
        type: String
      },
      mdesc: {
        type: String
      },
      featureImg:{
        type:String,
        required:true
      },
      categories: [{ type: ObjectId, ref: 'Category', required: true }],
      postedBy: {
        type: ObjectId,
        ref: 'Employee'
      },
      domain: {
        type: ObjectId,
        ref: 'Domain'
      },
      status: {
        type: Boolean,
        default: false
      },
      approval:{
        type:String,
        enum:["WAITING", "APPROVED", "NOT APPROVED"],
        default:"WAITING"
      },
      views_count:{
        type:Number,
        default:0
      },
      updatedBy:{
        type:ObjectId,
        ref:"Employee"
      }
}, { timestamps: true })
module.exports = mongoose.model("Blog", blogSchema);
