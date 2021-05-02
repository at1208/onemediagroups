const Upload = require("../utils/upload_file");


module.exports.upload_file = (req, res) => {
  Upload(req, res, function (error) {
      if (error) {
        console.log(error)
        return res.status(400).json({
          error:"Failed to upload"
        })
      }

      res.json({
        url:req.files[0].location,
        message:"File uploaded successfully"
      })
    });
}
