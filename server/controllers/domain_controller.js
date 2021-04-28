const Domain = require('../models/domain_model');
const slugify = require('slugify');
const { errorHandler } = require("../utils/dbErrorHandler");

exports.create = (req, res) => {
    const { name, url } = req.body;

    if(!name) return res.status(422).json({ error: "Domain name is required"});
    if(!url) return res.status(422).json({ error: "Domain url is required"});
    let domain = new Domain();
        domain.name = name;
        domain.url = url;
        domain.createdBy = req.user._id;
        domain.updatedBy = req.user._id;

    domain.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
          message: "Successfully created a new domain"
        });
    });
};

exports.list = (req, res) => {
    Domain.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
};
