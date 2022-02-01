// const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;
// var conn1 = mongoose.createConnection("mongodb://127.0.0.1:27017/cms", () =>
//   console.log("connected-1")
// );
// var conn2 = mongoose.createConnection(
//   "mongodb://127.0.0.1:27017/geeksocean",
//   () => console.log("connected-2")
// );
//
// var Task = new mongoose.Schema(
//   {
//     task_id: {
//       type: String,
//       unique: true,
//       required: true,
//       trim: true,
//     },
//     project_id: {
//       type: ObjectId,
//       ref: "Project",
//       required: true,
//     },
//     assignee: {
//       type: ObjectId,
//       ref: "Employee",
//       required: true,
//     },
//     follower: {
//       type: ObjectId,
//       ref: "Employee",
//       required: true,
//     },
//     owner: {
//       type: ObjectId,
//       ref: "Employee",
//       required: true,
//     },
//     title: {
//       type: String,
//       min: 5,
//       max: 80,
//       required: true,
//     },
//     description: {
//       type: String,
//       min: 5,
//       max: 320,
//       default: null,
//     },
//     status: {
//       type: String,
//       enum: ["Open", "Blog Review", "Done", "Closed"],
//       default: "Open",
//     },
//     comments: [
//       {
//         comment: String,
//         commented_by: {
//           type: ObjectId,
//           ref: "Employee",
//         },
//       },
//     ],
//     deadline: {
//       type: Date,
//       default: null,
//     },
//     del_flag: {
//       type: Boolean,
//       default: false,
//     },
//     attachments: [
//       {
//         filename: String,
//         url: String,
//       },
//     ],
//   },
//   { timestamps: true }
// );
//
// var Blogs = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       trim: true,
//       min: 3,
//       max: 400,
//       required: true,
//     },
//     slug: {
//       type: String,
//       unique: true,
//       index: true,
//     },
//     body: {
//       type: {},
//       required: true,
//       min: 200,
//       max: 2000000,
//     },
//     excerpt: {
//       type: String,
//       max: 1000,
//       trim: true,
//     },
//     mtitle: {
//       type: String,
//       trim: true,
//     },
//     mdesc: {
//       type: String,
//       trim: true,
//     },
//     featureImg: {
//       type: String,
//       default: null,
//     },
//     categories: [{ type: ObjectId, ref: "Category" }],
//     postedBy: {
//       type: ObjectId,
//       ref: "Employee",
//       default: null,
//     },
//     domain: {
//       type: ObjectId,
//       ref: "Domain",
//     },
//     status: {
//       type: Boolean,
//       default: false,
//     },
//     approval: {
//       type: String,
//       enum: ["WAITING", "APPROVED", "NOT APPROVED"],
//       default: "APPROVED",
//     },
//     views_count: {
//       type: Number,
//       default: 0,
//     },
//     updatedBy: {
//       type: ObjectId,
//       ref: "Employee",
//       default: null,
//     },
//     task: {
//       type: ObjectId,
//       ref: "Task",
//       unique: true,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );
//
// var model1 = conn1.model("Blogs", Blogs); //cms
// var model3 = conn1.model("Tasks", Task); //cms
// var model2 = conn2.model("Blogs", Blogs); //geeksocean
//
// model2.find().exec(async (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     for (let i = 1; i < result.length; i++) {
//       const task_id = "GO-" + parseInt(i + 1);
//       model3({
//         task_id,
//         project_id: "61f7cbf9b33c9ea1cd5d72f2",
//         assignee: "60c101aab9467821193d871a",
//         follower: "60bf01269476d13e0f6d3d0e",
//         owner: "60bf01269476d13e0f6d3d0e",
//         title: JSON.parse(JSON.stringify(result[i])).title,
//       }).save(async (err, task) => {
//         if (err) {
//           console.log(err);
//         }
//
//         model1({
//           title: result[i].title,
//           slug: result[i].slug,
//           body: result[i].body,
//           excerpt: result[i].excerpt,
//           mtitle: result[i].mtitle,
//           mdesc: result[i].mdesc,
//           postedBy: "60c101aab9467821193d871a",
//           domain: "61f7cbc8b33c9ea1cd5d7039",
//           approval: "APPROVED",
//           views_count: result[i].views,
//           task: task._id,
//           updatedBy: "60c045f5b9467821193d8708",
//         }).save(async (err, task) => {
//           if (err) {
//             console.log(err);
//           }
//           console.log("done");
//         });
//       });
//     }
//   }
// });
