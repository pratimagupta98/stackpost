const express = require("express");
const router = express.Router();
 
//console
const {
    add_fb_post,
    history,
    delete_post,
    Profile
    
} = require("../controller/add_fb_profile");

 
 
 router.post("/user/add_fb_post", add_fb_post);
 router.get("/user/history", history);
 router.delete("/user/delete_post", delete_post);
 router.get("/user/Profile", Profile);


 
 

module.exports = router;

