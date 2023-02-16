const Label = require("../models/label");
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


exports.add_label = async (req, res) => {
    const { time, date, add_label, workspace, timezone, approvel } = req.body
    const newLabel = new Label({
        time: time,
        date: date,
        add_label: add_label,
        workspace: workspace,
        timezone: timezone,
        approvel: approvel
    });
    newLabel.save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));

}

exports.get_label = async (req, res) => {
    await Label.find()
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.viewone_label = async (req, res) => {
    await Label.findOne({ _id: req.params.id })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.del_label = async (req, res) => {
    await Label.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.edit_label = async (req, res) => {
    
    await Label.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};



 