const express = require("express");
const router = express.Router();
 

const {
    createWorkSpace,
    workSpace_list
    
} = require("../controller/workspace");

 
 
 router.post("/user/createWorkSpace", createWorkSpace);
 router.get("/user/workSpace_list", workSpace_list);

 

module.exports = router;

