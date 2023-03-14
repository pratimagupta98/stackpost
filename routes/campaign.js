const express = require("express");
const router = express.Router();
 

const {
    add_Campaign,
    get_Campaign
   
    
} = require("../controller/campaign");

 
 
 router.post("/user/add_Campaign", add_Campaign);
 router.get("/user/get_Campaign", get_Campaign);

 
module.exports = router;

