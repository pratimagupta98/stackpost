const Workspce = require("../models/workspace");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");


  exports.createWorkSpace= async (req, res) => {
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