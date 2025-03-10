const Blog = require("../models/blog_model");
const Category = require("../models/category_model");
const Employee = require("../models/employee_model");
const Task = require("../models/task_model");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const { errorHandler } = require("../utils/dbErrorHandler");
const fs = require("fs");
const { smartTrim } = require("../utils/blog");
const { send_email } = require("../utils/send_email");

exports.create = (req, res) => {
  const { title, body, categories, featureImg, domain, task } = req.body;

  if (body.length < 300) {
    return res.status(400).json({
      error: "Blog content is less. Minimum 300 characters is required",
    });
  }

  if (!task) {
    return res.status(400).json({
      error: "Task ID is required.",
    });
  }

  let blog = new Blog();
  blog.title = title;
  blog.body = body;
  blog.excerpt = smartTrim(body, 160, " ", " ...");
  blog.slug = slugify(title).toLowerCase();
  blog.mtitle = `${title} | ${process.env.APP_NAME}`;
  blog.mdesc = stripHtml(body.substring(0, 160));
  blog.featureImg = featureImg;
  blog.domain = domain;
  blog.postedBy = req.user._id;
  blog.categories = categories;
  blog.updatedBy = req.user._id;
  blog.task = task;

  blog.save(async (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    if (task) {
      Task.findById({ _id: task })
        .populate("assignee", "full_name email")
        .populate("follower", "full_name email")
        .exec(async (err, existTask) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }
          existTask.status = "Blog Review";
          await existTask.save();
          await send_email(
            existTask.follower.email,
            `New article is posted by ${existTask.assignee.full_name}`,
            `<p>${existTask.assignee.full_name} has posted a new article. Please review his/her work</p><br /> Task ID: ${existTask.task_id}`
          );
        });
    }
    let author = await Employee.findById({ _id: req.user._id });
    if (author && author.author) {
      return res.json({
        message: "Blog is sent for review",
      });
    }
    author.author = true;
    await author.save();
    res.json({
      message: "Blog is sent for review",
    });
  });
};

exports.read_blog = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug, status: true, approval: "APPROVED" })
    .populate("categories", "_id name slug")
    .populate("task", "task_id")
    .populate("postedBy", "_id full_name headshot_url")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

module.exports.filter_blog = (req, res) => {
  // query = { postedBy: "", status:"", approval:"", domain:"" }

  var query = {};
  var payload = req.body;

  if (payload.postedBy) query.postedBy = { $in: payload.postedBy };
  if (payload.status) query.status = { $in: payload.status };
  if (payload.approval) query.approval = { $in: payload.approval };
  if (payload.domain) query.domain = { $in: payload.domain };

  Blog.find(query)
    .sort({ updatedAt: -1 })
    .populate("domain", "name url")
    .populate("task", "task_id")
    .populate("categories", "name")
    .populate("postedBy", "first_name last_name full_name")
    .select("title postedBy status approval slug")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
};

module.exports.single_blog = (req, res) => {
  const { id } = req.params;
  Blog.findById({ _id: id })
    .populate("categories", "name slug")
    .populate("task", "task_id")
    .populate("postedBy", "full_name headshot_url")
    .populate("updatedBy", "full_name")
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

module.exports.blog_list_by_domain = (req, res) => {
  const { domainId } = req.params;
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Blog.find({ status: true, domain: domainId, approval: "APPROVED" })
    .populate("categories", "name slug")
    .populate("task", "task_id")
    .populate("postedBy", "full_name")
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
};

module.exports.latest_authors_list_by_domain = (req, res) => {
  const { domainId } = req.params;
  Blog.find({ status: true, domain: domainId, approval: "APPROVED" })
    .populate("postedBy", "full_name headshot_url")
    .sort({ updatedAt: -1 })
    .select("postedBy")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      const arrayOfAuthors = [];
      for (let author of result) {
        if (arrayOfAuthors.length < 8) {
          let check = arrayOfAuthors.filter(
            (item) => item.postedBy._id === author.postedBy._id
          );
          if (!check.length) {
            arrayOfAuthors.push(author);
          }
        }
      }
      res.json(arrayOfAuthors);
    });
};

module.exports.trending_blogs_by_domain = (req, res) => {
  const { domainId } = req.params;
  let limit = req.body.limit ? parseInt(req.body.limit) : 8;
  Blog.find({ status: true, domain: domainId, approval: "APPROVED" })
    .populate("categories", "name slug")
    .populate("postedBy", "full_name")
    .sort({ views_count: -1 })
    .limit(limit)
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
};

module.exports.blog_review_update = (req, res) => {
  const { blogId } = req.params;
  const { approval, status } = req.body;
  Blog.findOneAndUpdate(
    { _id: blogId },
    { approval: approval, status: status, updatedBy: req.user._id },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Changes updated successfully",
    });
  });
};

module.exports.related_blogs_by_domain = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 6;
  const { _id, categories } = req.body.blog;
  const { domainId } = req.params;
  Blog.find({
    _id: { $ne: _id },
    domain: { $eq: domainId },
    categories: { $in: categories },
    approval: { $in: "APPROVED" },
    status: { $in: true },
  })
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("postedBy", "_id full_name")
    .populate("categories", "name slug")
    .select("title slug excerpt postedBy createdAt updatedAt featureImg body")
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: "Blogs not found",
        });
      }

      return res.json(blogs);
    });
};

module.exports.blog_list_for_sitemap = (req, res) => {
  const { domainId } = req.params;

  Blog.find({
    domain: domainId,
    approval: { $in: "APPROVED" },
    status: { $in: true },
  })
    .select("slug updatedAt createdAt")
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: "Blogs not found",
        });
      }
      res.json(blogs);
    });
};

module.exports.blog_list_by_category = (req, res) => {
  const { category, limit } = req.body;
  const { domainId } = req.params;

  Category.findOne({ slug: category, domain: domainId }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    Blog.find({
      domain: { $eq: domainId },
      categories: { $in: result._id },
      approval: { $in: "APPROVED" },
      status: { $in: true },
    })
      .sort({ createdAt: -1 })
      .populate("postedBy", "_id full_name")
      .populate("categories", "name slug")
      .select("title slug excerpt postedBy createdAt updatedAt featureImg body")
      .exec((err, blogs) => {
        if (err) {
          return res.status(400).json({
            error: "Blogs not found",
          });
        }
        res.json(blogs);
      });
  });
};

module.exports.my_blogs = (req, res) => {
  Blog.find({ postedBy: req.user._id })
    .populate("domain", "name")
    .populate("categories", "name")
    .populate("task", "task_id")
    .populate("postedBy", "first_name last_name full_name")
    .select("title postedBy status approval")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
};

exports.update_blog = async (req, res) => {
  const { blogId } = req.params;

  const { title, body, categories, featureImg, domain } = req.body;

  Blog.findById({ _id: blogId }).exec(async (err, blog) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    if (body.length < 300) {
      return res.status(400).json({
        error: "Blog content is less. Minimum 300 characters is required",
      });
    }

    blog.title = title;
    blog.body = body;
    blog.featureImg = featureImg;
    blog.domain = domain;
    blog.categories = categories;

    await blog.save(async (err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      return res.json({
        message: "Blog is updated successfully",
      });
    });
  });
};

module.exports.blog_list_carousel_by_domain = (req, res) => {
  const { domainId } = req.params;
  let limit = req.body.limit ? parseInt(req.body.limit) : 5;
  // let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Blog.find({ status: true, domain: domainId, approval: "APPROVED" })
    .sort({ updatedAt: -1 })
    .select("featureImg")
    // .skip(skip)
    .limit(limit)
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
};

module.exports.blog_by_category = (req, res) => {
  const { category, limit } = req.body;
  const { domainId } = req.params;

  Category.findOne({ slug: category, domain: domainId }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    Blog.find({
      domain: { $eq: domainId },
      categories: { $in: result._id },
      approval: { $in: "APPROVED" },
      status: { $in: true },
    })
      .sort({ createdAt: -1 })
      .populate("postedBy", "_id full_name")
      .populate("categories", "name slug")
      .select("title slug excerpt postedBy createdAt updatedAt featureImg body")
      .limit(5)
      .exec((err, blogs) => {
        if (err) {
          return res.status(400).json({
            error: "Blogs not found",
          });
        }
        res.json(blogs);
      });
  });
};

module.exports.top_rated_list = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 5;
  const { domainId } = req.params;

  Blog.find({
    domain: { $eq: domainId },
    is_movie: { $in: true },
    approval: { $in: "APPROVED" },
    status: { $in: true },
  })
    .limit(limit)
    .sort({ rating: -1 })
    .populate("postedBy", "_id full_name")
    .populate("categories", "name slug")
    .select(
      "title slug excerpt postedBy createdAt updatedAt featureImg body movie_name is_movie rating trailer_link"
    )
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: "Blogs not found",
        });
      }
      res.json(blogs);
    });
};

module.exports.released_list = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 4;
  const { domainId } = req.params;
  Blog.find({
    domain: { $eq: domainId },
    is_movie: { $in: true },
    approval: { $in: "APPROVED" },
    status: { $in: true },
  })
    .limit(limit)
    .sort({ release_date: 1 })
    .populate("postedBy", "_id full_name")
    .populate("categories", "name slug")
    .select(
      "title slug excerpt postedBy createdAt updatedAt featureImg body movie_name is_movie rating trailer_link"
    )
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: "Blogs not found",
        });
      }
      res.json(blogs);
    });
};
