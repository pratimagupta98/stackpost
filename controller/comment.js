const Comment = require("../models/comment");
const resp = require("../helpers/apiResponse");


exports.add_comment = async (req, res) => {
    const { userid, post, comment } = req.body
    const newComment = new Comment({
        post: post,
        userid: userid,
        comment: comment,
    });
    newComment.save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));

}

exports.get_comment = async (req, res) => {
    await Comment.find().populate("userid").populate("post")
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.viewone_comment = async (req, res) => {
    await Comment.findOne({ _id: req.params.id })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.del_comment = async (req, res) => {
    await Comment.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.edit_comment = async (req, res) => {

    await Comment.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};



