const Media= require("../models/media");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
const resp = require("../helpers/apiResponse");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.upload_media = async (req, res) => {
    const {media_img} = req.body
    const newMedia = new Media({
        media_img:media_img
      }); 

if (req.files) {
    if (req.files.media_img[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.media_img.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.media_img[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.media_img[i].path);
        alluploads.push(resp.secure_url);
      }
      newMedia.media_img = alluploads;
      newMedia.save()
      
      
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
    }
  }
}

exports.get_media= async (req, res) => {
    await Media.find() 
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
    };
    