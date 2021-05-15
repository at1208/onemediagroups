const Blog = require("../models/blog_model");
const Task = require("../models/task_model");
const BlogUser = require("../models/bloguser_model");
const Project = require("../models/project_model");

module.exports.info_count = async (req, res) => {
  const blog = new Promise((resolve, reject) => {
      Blog.find()
      .sort({ createdAt: -1 })
      .populate("domain", "name")
      .populate("postedBy", "full_name headshot_url")
      .select("domain postedBy status approval featureImg")
      .exec((err, result) => {
        if(err){
           reject(err)
        }
        resolve({ Blogs: result.length, data:result.slice(0,5) })
      })
  })


 const tasks = new Promise((resolve, reject) => {
    Task.find()
    .sort({ createdAt: -1 })
    .populate("project_id", "name")
    .populate("assignee", "full_name headshot_url")
    .populate("follower", "full_name headshot_url")
    .select("status assignee follower project_id")
    .exec((err, result) => {
      if(err){
         reject(err)
      }
      resolve({ Tasks: result.length, data:result.slice(0,5) })
    })
 })

 const blogUsers = new Promise((resolve, reject) => {
    BlogUser.find()
    .sort({ createdAt: -1 })
    .populate("domain", "name")
    .select("name picture domain")
    .exec((err, result) => {
      if(err){
         reject(err)
      }
      resolve({ Users: result.length, data:result.slice(0,5) })
    })
 })

 const projects = new Promise((resolve, reject) => {
    Project.find()
     .sort({ createdAt: -1 })
     .populate("domain", "name")
     .populate("team_leader", "full_name headshot_url")
     .select("name domain team_leader")
     .exec((err, result) => {
      if(err){
         reject(err)
      }
      resolve({ Projects: result.length, data:result.slice(0,5) })
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
