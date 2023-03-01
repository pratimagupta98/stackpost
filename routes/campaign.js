const express = require("express");
const router = express.Router();
 

const {
    add_Campaign,
   
    
} = require("../controller/campaign");

 
 
 router.post("/user/add_Campaign", add_Campaign);
 
module.exports = router;

