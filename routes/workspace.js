const express = require("express");
const router = express.Router();
 

const {
    createWorkSpace
    
} = require("../controller/workspace");

 
 
 router.post("/user/createWorkSpace", createWorkSpace);
 //router.post("/user/login", login);

 

module.exports = router;

