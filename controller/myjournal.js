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
  create_randomString(8);
  function create_randomString(string_length) {
    (randomString = ""),
      (characters =
        "1234567890");
    for (var i, i = 0; i < string_length; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomString;
  }
  const newMyjournal = new Myjournal({
    date:date,
    type:type,
    title: title,
    desc:desc,
    my_journal_id:randomString
  });
 

const findexist = await Myjournal.findOne({
  title: title,
});
if (findexist) {
  resp.alreadyr(res);
} 
if (req.files) {
  if (req.files.jrnl_img) {
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
  }

  newMyjournal
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
} else {
  res.status(200).json({
    status: false,
    msg: "img not uploaded",
  });
}
}
exports.createJournal_by_id= async (req, res) => {
  const { date,title,type,desc,my_journal_id } = req.body;

  const newMyjournal = new Myjournal({
    date:date,
    type:type,
    title: title,
    desc:desc,
    my_journal_id:my_journal_id
  });
 

const findexist = await Myjournal.findOne({
  title: title,
});
if (findexist) {
  resp.alreadyr(res);
} 
if (req.files) {
  if (req.files.jrnl_img) {
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
  }

  newMyjournal
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
} else {
  res.status(200).json({
    status: false,
    msg: "img not uploaded",
  });
}
}
exports.list_by_Journalid = async (req, res) => {
  await Myjournal.find({"my_journal_id":req.params.id})
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
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
     await Myjournal.find({ type: req.params.id }).sort({
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