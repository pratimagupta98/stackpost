const Campaign = require("../models/campaign");
const resp = require("../helpers/apiResponse");


exports.add_Campaign = async (req, res) => {
    const { campaign_name, goal } = req.body
    const newCampaign = new Campaign({
        campaign_name:campaign_name,
        goal:goal,
        // gsahdvdsgv
    });
    newCampaign.save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));

}

exports.get_Campaign = async (req, res) => {
    await Campaign.find().populate("userid").populate("post")
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.viewone_Campaign = async (req, res) => {
    await Campaign.findOne({ _id: req.params.id }).populate("userid").populate("post")
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.del_Campaign = async (req, res) => {
    await Campaign.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.edit_Campaign = async (req, res) => {

    await Campaign.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};



