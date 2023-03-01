const Compose = require("../models/compose");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
const resp = require("../helpers/apiResponse");
var cron = require('node-cron');
var moment = require('moment');
var task = cron.schedule('* * * * * *', () =>  {
      console.log('',moment().format('DD MM YYYY hh:mm:ss'));
     this.checkifapiexecute();
    });
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.add_compose = async (req, res) => {
    const { url,uploaded_img,desc,date,time,label ,platform} = req.body
    const newCompose = new Compose({
        url:url,
        uploaded_img:uploaded_img,
        desc:desc,
        date:date,
        time:time,
        label:label,
        platform:platform
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
            newCompose.media_img = alluploads;
            newCompose.save()


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


exports.get_compose = async (req, res) => {
    await Compose.find().populate("uploaded_img")
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.viewone_compose= async (req, res) => {
    await Compose.findOne({ _id: req.params.id })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.del_compose = async (req, res) => {
    await Compose.deleteOne({ _id: req.params.id })
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
    await Compose.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


 