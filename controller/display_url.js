const Display_url = require("../models/display_url");
const resp = require("../helpers/apiResponse");



  exports.add_display_url= async (req, res) => {
    const { displayUrl} = req.body;
   
    const newDisplay_url = new Display_url({
      
        displayUrl:displayUrl
       
     });
    
     newDisplay_url
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  

   

  exports.display_url_list = async (req, res) => {
    await Display_url.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.repo_dlt_workspace = async (req, res) => {
    await Display_url.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.repo_viewone_workspace = async (req, res) => {
    await Display_url.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };