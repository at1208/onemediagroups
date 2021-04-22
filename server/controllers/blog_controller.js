const Blog = require('../models/blog_model');
const Category = require('../models/category_model');
const User = require('../models/employee_model');
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

    blog.save((err, result) => {
      if(err){
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json({
        message:"Blog is sent for review"
      })
    });
};
