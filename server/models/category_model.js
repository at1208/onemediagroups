const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            lowercase:true,
            required: true,
            max: 32
        },
        domain:{
           type:ObjectId,
           ref:"Domain",
           required:true
        },
        slug: {
            type: String
        },
        createdBy:{
          type:ObjectId,
          ref:"Employee",
          required:true
        },
        updatedBy:{
          type:ObjectId,
          ref:"Employee"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
