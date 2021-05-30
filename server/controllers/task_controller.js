const Task =  require("../models/task_model");
const Employee =  require("../models/employee_model");
const Notification = require("../models/notification_model");
const { send_email } = require("../utils/send_email");

module.exports.create_task = async (req, res) => {
  const { project_id, assignee, description, comments, owner, follower, title, deadline } = req.body;

  await Task({
    project_id,
    assignee,
    description,
    comments,
    follower,
    owner,
    title,
    deadline
  }).save(async (err, task) => {
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    let assigned = await Employee.findById({ _id: task.assignee });
    let created_owner = await Employee.findById({ _id: task.owner });
    let reporter = await Employee.findById({ _id: task.follower });

   let notification_title = `A new task has been assigned to ${assigned.full_name} by ${created_owner.full_name}`
   let notification_created_by = owner;

   const { email, full_name, headshot_url, _id} = created_owner;

   let notification_desc = {
     task: title,
     description: description,
     createdBy: {
       email: email,
       full_name: full_name,
       headshot_url: headshot_url,
       _id: _id
     },
     reporter: {
       email: reporter.email,
       full_name: reporter.full_name,
       headshot_url: reporter.headshot_url,
       _id: reporter._id
     }
   }

   let notify = await Notification({ title: notification_title, description: JSON.stringify(notification_desc), notification_created_by, notification_for_whom: [assignee]}).save()
   console.log(notify)
    if(assigned && reporter){
      send_email(assigned.email, "New task assigned",`<p>${reporter.full_name} has assigned a task to you</p><br /> <a href="http://localhost:3000/tasks">See task</a>`)
      .then(() => {
        return res.status(200).json({
          message:"New task created successfully"
        })
      })
      .catch(console.error)
    }
  })
}

module.exports.update_task = (req, res) => {
  const { _id } = req.params;
  const { assignee, description, comments, follower, title, deadline, status  } = req.body;

  Task.findOne({ _id })
    .exec((err, task) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      if(!task){
        return res.status(404).json({
          error: "No task found with given task id"
        })
      }
      if(assignee){
        task.assignee = assignee;
      }
      if(status){
        task.status = status;
      }
      if(description){
        task.description = description;
      }
      if(comments){
        task.comments = comments
      }
      if(follower){
        task.follower = follower;
      }
      if(title){
        task.title = title;
      }
      if(deadline){
        task.deadline = deadline;
      }
      task.save((err, result) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        res.status(200).json({
          message:"Task updated successfully"
        })
      })
    })

}

module.exports.delete_task = (req, res) => {
  const { _id } = req.params;
  Task.findByIdAndUpdate({ _id }, { del_flag: true }, { new:true })
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     }
     res.status(200).json({
       message:"Task delete successfully"
     })
   })
}

module.exports.single_task = (req, res) => {
  const { _id } = req.params;
  Task.findById({ _id })
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error:err
        })
      }
      res.status(200).json({
         task: result
      })
    })
}

module.exports.all_task = (req, res) => {
  Task.find({ del_flag: false })
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     }
     res.status(200).json({
        tasks: result
     })
   })
}

module.exports.task_count_by_project = (req, res) => {
  const { project_id } = req.params;
  Task.find({ project_id, del_flag:false })
    .select("status")
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      let open = result.filter((task) => task.status == "Open");
      let done = result.filter((task) => task.status == "Done");
      res.json({
        open: open.length,
        done: done.length
      })
    })
}




module.exports.filter_task = (req, res) => {
   // query = { project: "", assignee:"", follwer:"", status:"" }
var query = {};
var payload = req.body;

if (payload.project_id) query.project_id = {$in : payload.project_id};
if (payload.assignee) query.assignee = {$in : payload.assignee};
if (payload.follower) query.follower = {$in : payload.follower};
if (payload.status) query.status = {$in : payload.status};
query.del_flag = {$in : false};

    Task.find(query)
    .sort({ updatedAt: -1})
    .populate("project_id", "name")
    .populate("assignee", "first_name last_name full_name")
    .populate("follower", "first_name last_name full_name")
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.json(result)
    })
}

module.exports.my_tasks = (req, res) => {
  Task.find({ assignee: req.user._id, del_flag: false })
    .sort({ updatedAt: -1 })
    .populate("project_id", "name")
    .populate("assignee", "first_name last_name full_name")
    .populate("follower", "first_name last_name full_name")
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.json(result)
    })
}
