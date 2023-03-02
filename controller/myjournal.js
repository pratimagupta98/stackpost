const Myjournal = require("../models/myjournal");
const resp = require("../helpers/apiResponse");
 
exports.add_MyJournal= async (req, res) => {
  const { date,title,type,desc } = req.body;

  const newMyjournal = new Myjournal({
    date:date,
    type:type,
    title: title,
    desc:desc
  });
 
  newMyjournal
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
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