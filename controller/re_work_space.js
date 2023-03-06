const Workspce = require("../models/re_work_space");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");


  exports.repo_WorkSpace= async (req, res) => {
    const { workspacename,timezone} = req.body;
   
    const newWorkspce = new Workspce({
      
        workspacename:workspacename,
        timezone:timezone,
       
     });
    const findexist = await Workspce.findOne({ workspacename: workspacename });
    if (findexist) {
      resp.alreadyr(res);
    } else {
        newWorkspce
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }

  exports.Connect_with_myWorkSpace = async (req, res) => {
    await Workspce.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.repo_workSpace_list = async (req, res) => {
    await Workspce.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.repo_dlt_workspace = async (req, res) => {
    await Workspce.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.repo_viewone_workspace = async (req, res) => {
    await Workspce.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };