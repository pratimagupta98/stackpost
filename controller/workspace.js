const Workspce = require("../models/workspace");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");


  exports.createWorkSpace= async (req, res) => {
    const { workspacename,timezone,socialplatform,facebookData,googleData,twitterData,linkedlnData,instaData,youtubeData,tiktokData} = req.body;
   
    const newWorkspce = new Workspce({
      
        workspacename:workspacename,
        timezone:timezone,
        socialplatform:socialplatform,
        facebookData:facebookData,
        googleData:googleData,
        twitterData:twitterData,
        linkedlnData:linkedlnData,
        instaData:instaData,
        youtubeData:youtubeData,
        tiktokData:tiktokData

       
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

  exports.workSpace_list = async (req, res) => {
    await Workspce.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.dlt_workspace = async (req, res) => {
    await Workspce.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.viewone_workspace = async (req, res) => {
    await Workspce.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.update_my_myWorkSpace = async (req, res) => {
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