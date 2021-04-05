const Project = require("../models/project_model");
const { errorHandler } = require("../utils/dbErrorHandler");
const formidable = require('formidable');
const fs = require('fs');

module.exports.create_project = async (req, res) => {
     const {  name,
              description,
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
        project.description = description;
        project.team_members = team_members;
        project.team_leader = team_leader;
        project.start_date = start_date;
        project.end_date = end_date;
        project.priority = priority;

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


module.exports.update_project = (req, res) => {
  const { _id } = req.params;
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
        return res.status(400).json({
            error: 'image could not upload'
        });
    }

   const {  name,
            description,
            team_leader,
            team_members,
            start_date,
            end_date,
            priority
         } = fields;

    Project.findOne({ _id })
      .exec((err, project) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        if(name){
           project.name = name
        }
        if(description){
           project.description = description
        }
        if(team_leader){
           project.team_leader = team_leader
        }
        if(team_members){
           project.team_members = team_members
        }
        if(start_date){
           project.start_date = start_date
        }
        if(end_date){
           project.end_date = end_date
        }
        if(priority){
           project.priority = priority
        }

      if (files.logo) {
        if (files.logo.size > 10000000) {
            return res.status(400).json({
                error: 'File should be less then 1mb in size'
            });
        }
          project.logo.data = fs.readFileSync(files.logo.path);
          project.logo.content_type = files.logo.type;
      }

      if (files.uploaded_file) {
        if (files.uploaded_file.size > 30000000) {
            return res.status(400).json({
                error: 'File should be less then 3mb in size'
            });
        }
          project.uploaded_file.data = fs.readFileSync(files.uploaded_file.path);
          project.uploaded_file.content_type = files.uploaded_file.type;
      }
        project.save((err, result) => {
           if (err) {
               return res.status(400).json({
                   error: errorHandler(err)
               });
           }
           res.status(200).json({
             message: "Project details updated successfully."
           })
        });
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
