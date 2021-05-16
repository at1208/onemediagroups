const Blog = require('../models/blog_model');
const Category = require('../models/category_model');
const Employee = require('../models/employee_model');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const { errorHandler } = require('../utils/dbErrorHandler');
const fs = require('fs');
const { smartTrim } = require('../utils/blog');


exports.create = (req, res) => {

  const {
    title, body, categories, featureImg, domain
  } = req.body;

if(body.length <300){
  return res.status(400).json({
    error: "Blog content is less. Minimum 300 characters is required"
  })
}

    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.excerpt = smartTrim(body, 160, ' ', ' ...');
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 160));
    blog.featureImg= featureImg;
    blog.domain = domain;
    blog.postedBy = req.user._id;
    blog.categories = categories;
    blog.updatedBy = req.user._id;

    blog.save(async (err, result) => {
      if(err){
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      let author = await Employee.findById({_id: req.user._id})
         if(author && author.author){
           return res.json({
             message:"Blog is sent for review"
           })
         }
          author.author = true;
          await author.save()
          res.json({
            message:"Blog is sent for review"
          })
    });
};


exports.read_blog = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Blog.findOne({ slug, status: true, approval:"APPROVED" })
        .populate('categories', '_id name slug')
        .populate('postedBy', '_id full_name headshot_url')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};


module.exports.filter_blog = (req, res) => {
   // query = { postedBy: "", status:"", approval:"", domain:"" }

var query = {};
var payload = req.body;

if (payload.postedBy) query.postedBy = {$in : payload.postedBy};
if (payload.status) query.status = {$in : payload.status};
if (payload.approval) query.approval = {$in : payload.approval};
if (payload.domain) query.domain = {$in : payload.domain};

  Blog.find(query)
     .populate("domain", "name")
     .populate("categories", "name")
     .populate("postedBy", "first_name last_name full_name")
     .select("title postedBy status approval")
     .exec((err, result) => {
       if(err){
         return res.status(400).json({
           error: err
         })
       }
       res.json(result)
   })
}


module.exports.single_blog = (req, res) => {
 const { id } = req.params;
   Blog.findById({ _id: id })
     .populate("categories", "name slug")
     .populate("postedBy", "full_name")
     .populate("updatedBy", "full_name")
     .populate("domain", "name url")
     .exec((err, result) => {
       if(err){
         return res.status(400).json({
           error: err
         })
       }
       res.json(result)
     })
}

module.exports.blog_list_by_domain = (req, res) => {
      const { domainId } = req.params;
      let limit = req.body.limit ? parseInt(req.body.limit) : 10;
      let skip = req.body.skip ? parseInt(req.body.skip) : 0;

      Blog.find({ status: true, domain: domainId, approval:"APPROVED" })
         .populate("categories", "name slug")
         .populate("postedBy", "full_name")
         .sort({ updatedAt: -1 })
         .skip(skip)
         .limit(limit)
         .exec((err, result) => {
           if(err){
             return res.status(400).json({
               error: err
             })
           }
           res.json(result)
         })
}

module.exports.latest_authors_list_by_domain = (req, res) => {
    const { domainId } = req.params;
    Blog.find({ status: true, domain: domainId, approval:"APPROVED" })
      .populate("postedBy", "full_name headshot_url")
      .sort({ updatedAt: -1 })
      .select("postedBy")
      .exec((err, result) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
       const arrayOfAuthors = [];
       for(let author of result){
         if(arrayOfAuthors.length < 8){
           let check = arrayOfAuthors.filter((item) => item.postedBy._id === author.postedBy._id);
          if(!check.length){
             arrayOfAuthors.push(author)
          }
         }
       }
        res.json(arrayOfAuthors)
      })
}

module.exports.trending_blogs_by_domain = (req, res) => {
  const { domainId } = req.params;
  Blog.find({ status: true, domain: domainId, approval:"APPROVED" })
    .populate("categories", "name slug")
    .populate("postedBy", "full_name")
    .sort({ views_count: -1 })
    .limit(6)
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.json(result)
    })
}

module.exports.blog_review_update = (req, res) => {
    const { blogId } = req.params;
    const { approval, status } = req.body;
    Blog.findOneAndUpdate({ _id: blogId}, { approval: approval, status: status, updatedBy: req.user._id }, { new:true})
     .exec((err, result) => {
       if(err){
         return res.status(400).json({
           error: err
         })
       }
       res.json({
         message: "Changes updated successfully"
       })
     })
}


module.exports.related_blogs_by_domain = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 6;

//   const blog = {
//     "categories": [
//         {
//             "_id": "608e7b2175fd482f88c02778",
//             "name": "electrical",
//             "slug": "electrical"
//         }
//     ],
//     "status": true,
//     "approval": "APPROVED",
//     "views_count": 0,
//     "_id": "608eb2f04de24249ffb8a4ea",
//     "title": "Tips To Crack Logical Reasoning Puzzle Questions1130",
//     "body": "<p><span style=\"color: rgb(0, 0, 0);\">The only section in the competitive examination that evaluates the candidates’ critical thinking ability is the logical reasoning questions. Its questions are based on image reflections, patterns, number sequences, and shapes. Here, candidates have to pick the correct solution and leave out the irrelevant data while solving Logical Reasoning questions. These types of queries are mostly asked in competitive exams like banking, SSC, and many others.The only section in the competitive examination that evaluates the candidates’ critical thinking ability is the logical reasoning questions. Its questions are based on image reflections, patterns, number sequences, and shapes. Here, candidates have to pick the correct solution and leave out the irrelevant data while solving Logical Reasoning questions. These types of queries are mostly asked in competitive exams like banking, SSC, and many others.The only section in the competitive examination that evaluates the candidates’ critical thinking ability is the logical reasoning questions. Its questions are based on image reflections, patterns, number sequences, and shapes. Here, candidates have to pick the correct solution and leave out the irrelevant data while solving Logical Reasoning questions. These types of queries are mostly asked in competitive exams like banking, SSC, and many others.</span><img src=\"https://stagingtest.sfo3.digitaloceanspaces.com/hi-yatri-logo-png-.png9840b02b-7c7f-4f98-8fa9-90beabd77396\"></p>",
//     "excerpt": "<p><span style=\"color: rgb(0, 0, 0);\">The only section in the competitive examination that evaluates the candidates’ critical thinking ability is the logical ...",
//     "slug": "tips-to-crack-logical-reasoning-puzzle-questions1130",
//     "mtitle": "Tips To Crack Logical Reasoning Puzzle Questions1130 | undefined",
//     "mdesc": "The only section in the competitive examination that evaluates the candidates’ critical thinking ability is the logical re",
//     "featureImg": "https://stagingtest.sfo3.digitaloceanspaces.com/aman_Original.jpg9bdbb668-27f3-470a-8da3-d9f9bd554b78",
//     "domain": "608e7b0d75fd482f88c02777",
//     "postedBy": {
//         "full_name": "Admin Buddy",
//         "headshot_url": "https://stagingtest.sfo3.digitaloceanspaces.com/aman_Original.jpg9bdbb668-27f3-470a-8da3-d9f9bd554b78",
//         "_id": "608d3ab713d8a008f953b9b4"
//     },
//     "createdAt": "2021-05-02T14:10:56.993Z",
//     "updatedAt": "2021-05-02T14:10:56.993Z",
//     "__v": 0
// }
  // const { _id, categories } = blog;
  const { _id, categories } = req.body.blog;
  const { domainId } = req.params;

  Blog.find({ _id: { $ne: _id }, domain: { $eq: domainId }, categories: { $in: categories } })
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('postedBy', '_id full_name')
      .populate('categories', 'name slug')
      .select('title slug excerpt postedBy createdAt updatedAt')
      .exec((err, blogs) => {
          if (err) {
              return res.status(400).json({
                  error: 'Blogs not found'
              });
          }
          res.json(blogs);
      });
}
