const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const notificationSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            trim: true,
            required: true
        },
        description:{
            type: String,
            trim: true,
        },
        notification_for_whom:[{
          type:ObjectId,
          ref:"Employee",
          required:true
        }],
        notification_created_by:{
          type:ObjectId,
          ref:"Employee",
          required:true
        },
        read_by:[{
          type:ObjectId,
          ref:"Employee"
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
