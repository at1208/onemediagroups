const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 400,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    body: {
      type: {},
      required: true,
      min: 200,
      max: 2000000,
    },
    excerpt: {
      type: String,
      max: 1000,
      trim: true,
    },
    mtitle: {
      type: String,
      trim: true,
    },
    mdesc: {
      type: String,
      trim: true,
    },
    featureImg: {
      type: String,
      required: true,
    },
    categories: [{ type: ObjectId, ref: "Category", required: true }],
    postedBy: {
      type: ObjectId,
      ref: "Employee",
    },
    domain: {
      type: ObjectId,
      ref: "Domain",
    },
    status: {
      type: Boolean,
      default: false,
    },
    approval: {
      type: String,
      enum: ["WAITING", "APPROVED", "NOT APPROVED"],
      default: "WAITING",
    },
    views_count: {
      type: Number,
      default: 0,
    },
    updatedBy: {
      type: ObjectId,
      ref: "Employee",
    },
    task: {
      type: ObjectId,
      ref: "Task",
      unique: true,
      required: true,
    },
    rating: {
      type: Number,
      default: null,
    },
    is_movie: {
      type: Boolean,
      default: false,
    },
    movie_name: {
      type: String,
      default: null,
    },
    trailer_link: {
      type: String,
      default: null,
    },
    release_date: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", blogSchema);
