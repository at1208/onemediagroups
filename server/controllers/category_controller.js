const Category = require("../models/category_model");
const slugify = require("slugify");
const { errorHandler } = require("../utils/dbErrorHandler");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  const { name, domain } = req.body;
  let slug = slugify(name).toLowerCase();

  let findCategory = await Category.findOne({
    $and: [{ name: { $eq: name } }, { domain: { $eq: domain } }],
  });
  if (findCategory) {
    return res.status(400).json({
      error: "Category already exist in given domain",
    });
  }
  let category = new Category();
  category.name = name;
  category.slug = slug;
  category.domain = domain;
  category.createdBy = req.user._id;
  domain.updatedBy = req.user._id;

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Successfully created a new category",
    });
  });
};

exports.list = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

module.exports.filter_category = (req, res) => {
  // query = { domain: "", category:"" }
  // console.log(req.body)
  var query = {};
  var payload = req.body;

  if (payload.domain) query.domain = { $in: payload.domain };
  if (payload.category) query._id = { $in: payload.category };
  // query.del_flag = {$in : false};

  Category.find(query)
    .populate("domain", "name url")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      res.json(result);
    });
};

module.exports.random_blog_categories = (req, res) => {
  let { domainId } = req.params;
  let _id = mongoose.Types.ObjectId(domainId);
  Category.aggregate([
    { $match: { domain: { $in: [_id] } } },
    { $sample: { size: 3 } },
  ]).exec((err, result) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    res.json(result);
  });
};

exports.category_list_by_domain = (req, res) => {
  Category.find({ domain: req.params.domain }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.category_by_slug = (req, res) => {
  const { domainId, slug } = req.params;
  Category.find({ domain: domainId, slug: slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
