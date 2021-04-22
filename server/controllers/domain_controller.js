const Domain = require('../models/domain_model');
const slugify = require('slugify');

exports.create = (req, res) => {
    const { name } = req.body;

    if(!name) return res.status(422).json({ error: "Domain name is required"})
    let category = new Domain({ name });

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
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
