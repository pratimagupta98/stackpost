const Media = require("../models/media");
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
    const { media_img } = req.body
    const newMedia = new Media({
        media_img: media_img
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
    }else{
        res.status(404).json({
            status: false,
            
            error: "error",
          });
    }
}

exports.get_media = async (req, res) => {
    await Media.find()
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.viewone_media = async (req, res) => {
    await Media.findOne({ _id: req.params.id })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.del_media = async (req, res) => {
    await Media.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.edit_media = async (req, res) => {
    const {media_img } = req.body

    data = {}
    

    if (req.files) {
        if (req.files.media_img) {
            alluploads = [];
            for (let i = 0; i < req.files.media_img.length; i++) {
                // console.log(i);
                const resp = await cloudinary.uploader.upload(req.files.media_img[i].path, {
                    use_filename: true,
                    unique_filename: false,
                });
                fs.unlinkSync(req.files.media_img[i].path);
                alluploads.push(resp.secure_url);
            }
            // newStore.storeImg = alluploads;
            data.media_img = alluploads;
        }
    }
    await Media.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};



exports.upload = async (req, res) => {
const fetch = require("node-fetch");
const API_KEY = "6D7WPF5-5RX4JC2-JWHH12G-GP84J41";
const base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...";

fetch("https://app.ayrshare.com/api/media/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        file: base64,
        fileName: "test.png",
        description: "best image"
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch(console.error)
}