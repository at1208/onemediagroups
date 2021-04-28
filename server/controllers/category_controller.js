const Category = require('../models/category_model');
const slugify = require('slugify');
const { errorHandler } = require("../utils/dbErrorHandler");


exports.create = async (req, res) => {
    const { name, domain } = req.body;
    let slug = slugify(name).toLowerCase();

      let findCategory = await Category.findOne({
        $and:[
          { name: { $eq: name } },
          { domain: { $eq: domain } }
        ]
      });
      if(findCategory){
        return res.status(400).json({
          error: "Category already exist in given domain"
        })
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
                error: errorHandler(err)
            });
        }
        res.json({
          message: "Successfully created a new category"
        });
    });
};


exports.list = (req, res) => {
    Category.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
};
