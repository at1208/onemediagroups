const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const domainSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            lowercase:true,
            trim: true,
            required: true,
            max: 32
        },
        url: {
            type: String,
            trim: true,
            lowercase:true,
            unique:true,
            required: true,
            max: 32
        },
        createdBy:{
          type:ObjectId,
          ref:"Employee",
          required:true
        },
        updatedBy:{
          type:ObjectId,
          ref:"Employee",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Domain', domainSchema);
