const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Domain', domainSchema);
