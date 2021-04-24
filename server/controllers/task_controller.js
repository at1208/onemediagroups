const Task =  require("../models/task_model");

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
  }).save((err, task) => {
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    res.status(200).json({
      message:"New task created successfully"
    })
  })
}

module.exports.update_task = (req, res) => {
  const { _id } = req.params;
  const { assignee, description, comments, follower, title, deadline  } = req.body;

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
  Task.find({ project_id })
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


//project assignee follower owner title status

module.exports.filter_task = (req, res) => {
   // query = { project: "", assignee:"", follwer:"", status:"" }
   console.log(req.body)
var query = {};
var payload = req.body;

if (payload.project_id) query.project_id = {$in : payload.project_id};
if (payload.assignee) query.assignee = {$in : payload.assignee};
if (payload.follower) query.follower = {$in : payload.follower};
if (payload.status) query.status = {$in : payload.status};

    Task.find(query)
    .populate("project_id", "name")
    .populate("assignee", "first_name last_name")
    .populate("follower", "first_name last_name")
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      let data = result.map((task) => {
        return {
          task_name:task.title,
          description: task.description,
          assignee: task.assignee.first_name + " " + task.assignee.last_name,
          reporter: task.follower.first_name + " " + task.follower.last_name,
          status: task.status,
          project:task.project_id.name
        }
      })
      res.json(data)
    })
}
