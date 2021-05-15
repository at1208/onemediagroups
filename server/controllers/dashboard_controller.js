const Blog = require("../models/blog_model");
const Task = require("../models/task_model");
const BlogUser = require("../models/bloguser_model");
const Project = require("../models/project_model");

module.exports.info_count = async (req, res) => {
  const blog = new Promise((resolve, reject) => {
      Blog.countDocuments()
      .exec((err, result) => {
        if(err){
           reject(err)
        }
        resolve({ Blogs: result })
      })
  })

 const tasks = new Promise((resolve, reject) => {
    Task.countDocuments()
    .exec((err, result) => {
      if(err){
         reject(err)
      }
      resolve({ Tasks: result })
    })
 })

 const blogUsers = new Promise((resolve, reject) => {
    BlogUser.countDocuments()
    .exec((err, result) => {
      if(err){
         reject(err)
      }
      resolve({ Users: result })
    })
 })

 const projects = new Promise((resolve, reject) => {
    Project.countDocuments()
    .exec((err, result) => {
      if(err){
         reject(err)
      }
      resolve({ Projects: result })
    })
 })


  Promise.all([projects, tasks, blog, blogUsers]).then(response => {
    res.json(response)
  }).catch((err) => {
    res.status(400).json({
      error: err
    })
  })
}
