const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');


const spacesEndpoint = new aws.Endpoint(process.env.DO_SPACE_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_ACCESS_KEY_ID,
  secretAccessKey: process.env.DO_SECRET_ACCESS_KEY
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'stagingtest',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async function (request, file, cb) {
      cb(null, file.originalname + await uuidv4());
    }
  })
}).array('upload', 1);

module.exports = upload;
