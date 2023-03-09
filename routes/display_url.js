const express = require("express");
const router = express.Router();
 

const {
    add_display_url,
    display_url_list
    
    
} = require("../controller/display_url");

 
 
router.post("/user/add_display_url", add_display_url);
router.get("/user/display_url_list", display_url_list);
  



 

module.exports = router;

