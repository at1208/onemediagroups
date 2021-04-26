const Project = require("../models/project_model");
const { errorHandler } = require("../utils/dbErrorHandler");
const formidable = require('formidable');
const fs = require('fs');

module.exports.create_project = async (req, res) => {
     const {  name,
              description,
              domain,
              team_leader,
              team_members,
              start_date,
              end_date,
              priority
           } = req.body;

        if(!name){
          return res.status(400).json({
            error: "Project name is required"
          })
        }

        if(!team_leader){
          return res.status(400).json({
            error: "Team leader is required"
          })
        }

        if(!team_members){
          return res.status(400).json({
            error: "Team members is required"
          })
        }

        if(!start_date){
          return res.status(400).json({
            error: "Start date is required"
          })
        }

        const project = new Project();
        project.name = name;
        project.domain = domain;
        project.description = description;
        project.team_members = team_members;
        project.team_leader = team_leader;
        project.start_date = start_date;
        project.end_date = end_date;
        project.priority = priority;
        project.createdBy = req.user._id,
        project.updatedBy = req.user._id

        await project.save((err, result) => {
              if (err) {
                  return res.status(400).json({
                      error: errorHandler(err)
                  });
              }
              res.status(200).json({
                message:"New Project successfully created"
              })
          })

}


module.exports.update_project = async (req, res) => {
   const { _id } = req.params;
   const {  name,
            description,
            domain,
            team_leader,
            team_members,
            start_date,
            end_date,
            priority,
         } = req.body;

   Project.findById({ _id })
      .exec((err, project) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }

        if(!project){
          return res.status(404).json({
            error: "Project not found"
          })
        }

      if(name){
        project.name = name;
      }
      if(domain){
        project.domain = domain;
      }
      if(description){
        project.description = description;
      }
      if(team_leader){
        project.team_leader = team_leader;
      }
      if(team_members){
        project.team_members = team_members;
      }
      if(start_date){
        project.start_date = start_date;
      }
      if(end_date){
        project.end_date = end_date;
      }
      if(priority){
          project.priority = priority;
      }

       project.updatedBy = req.user._id;
       project.save((err, result) => {
         if(err){
           error: err
         }
         res.json({
           message:"Project successfully updated"
         })
       })
   })
}


module.exports.delete_project = (req, res) => {
   const { _id } = req.params;
   Project.findByIdAndUpdate({ _id }, { del_flag: true }, { new:true })
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error:err
        })
      }
      res.status(200).json({
        message:"Project delete successfully"
      })
    })
}

module.exports.all_project = (req, res) => {
  Project.find({ del_flag: false })
  .populate("domain", "name")
  .populate("team_leader", "full_name first_name last_name headshot_url")
  .populate("team_members", "full_name first_name last_name headshot_url")
  .populate("createdBy", "full_name first_name last_name headshot_url")
  .populate("updatedBy", "full_name first_name last_name headshot_url")
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     }
     res.status(200).json({
        projects: result
     })
   })
}



module.exports.single_project = (req, res) => {
   const { _id } = req.params;
   Project.findById({ _id })
     .exec((err, result) => {
       if(err){
         return res.status(400).json({
           error:err
         })
       }
       res.status(200).json({
          project: result
       })
     })
}
