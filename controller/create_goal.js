const Goal = require("../models/create_goal");
const resp = require("../helpers/apiResponse");


exports.create_goal = async (req, res) => {
    const { category_goal, goal_name, value,url,desc } = req.body
    const newGoal = new Goal({
        category_goal: category_goal,
        goal_name: goal_name,
        value: value,
        url: url,
        desc: desc,
        
    });
    newGoal.save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));

}

exports.get_Goal = async (req, res) => {
    await Goal.find()
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.viewone_Goal = async (req, res) => {
    await Goal.findOne({ _id: req.params.id })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.del_Goal = async (req, res) => {
    await Goal.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.edit_Goal = async (req, res) => {
    
    await Goal.findOneAndUpdate(
        { _id: req.params.id },
        { $set: data },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};



 