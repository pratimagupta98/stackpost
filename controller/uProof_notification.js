const UprrofNotification = require("../models/uProof_notification.js");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");


  exports.add_uproof_noti= async (req, res) => {
    const { workspacename,timezone} = req.body;
   
    const newUprrofNotification = new UprrofNotification({
      
        workspacename:workspacename,
        timezone:timezone,
       
     });
    const findexist = await UprrofNotification.findOne({ workspacename: workspacename });
    if (findexist) {
      resp.alreadyr(res);
    } else {
        newUprrofNotification
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }

  exports.update_uproof_noti = async (req, res) => {
    await UprrofNotification.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.list_uproof_noti = async (req, res) => {
    await UprrofNotification.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.dlt_uproof_noti = async (req, res) => {
    await UprrofNotification.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.getone_uproof_noti = async (req, res) => {
    await UprrofNotification.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };