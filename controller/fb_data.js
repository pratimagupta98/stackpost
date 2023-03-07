const PostFbdata = require("../models/fb_data");
const resp = require("../helpers/apiResponse");


exports.add_fb_workspace = async (req, res) => {
    const { workspace_name,timezone,img,social_platform } = req.body
    const newPostFbdata = new PostFbdata({
        workspace_name:workspace_name,
        timezone:timezone,
        social_platform:social_platform,
        img:img,
        type:"true"

    });




    newPostFbdata.save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));

}

exports.get_workspace_data = async (req, res) => {
    await PostFbdata.find()
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.viewone_Campaign = async (req, res) => {
    await PostFbdata.findOne({ _id: req.params.id }).populate("userid").populate("post")
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.del_Campaign = async (req, res) => {
    await PostFbdata.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.edit_Campaign = async (req, res) => {

    await PostFbdata.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};



