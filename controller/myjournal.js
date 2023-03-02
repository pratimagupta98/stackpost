const Myjournal = require("../models/myjournal");
const resp = require("../helpers/apiResponse");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.add_MyJournal= async (req, res) => {
  const { date,title,type,desc } = req.body;

  const newMyjournal = new Myjournal({
    date:date,
    type:type,
    title: title,
    desc:desc
  });
 
  if (req.files) {
    if (req.files.jrnl_img[0].path) {
        alluploads = [];
        for (let i = 0; i < req.files.jrnl_img.length; i++) {
            const resp = await cloudinary.uploader.upload(
                req.files.jrnl_img[i].path,
                { use_filename: true, unique_filename: false }
            );
            fs.unlinkSync(req.files.jrnl_img[i].path);
            alluploads.push(resp.secure_url);
        }
        newMyjournal.jrnl_img = alluploads;
        newMyjournal.save()


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



exports.myJournal_list = async (req, res) => {
    await Myjournal.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getone_myJournal = async (req, res) => {
    await Myjournal.findOne({_id:req.params.id})
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.dltMyJournal = async (req, res) => {
    await Myjournal.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.get_myJournal_bytype = async (req, res) => {
     await Myjournal.find({ bannertype: req.params.id }).sort({
      sortorder: 1,
    })
    .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.personal_list = async (req, res) => {
    await Myjournal.find({type:"Personal"})
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.business_list = async (req, res) => {
    await Myjournal.find({type:"Business"})
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.notes_list = async (req, res) => {
    await Myjournal.find({type:"Notes"})
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };