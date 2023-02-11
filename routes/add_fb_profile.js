const express = require("express");
const router = express.Router();
 

const {
    add_fb_post,
    media
    
} = require("../controller/add_fb_profile");

 
 
 router.post("/user/add_fb_post", add_fb_post);
 router.get("/user/media", media);

 

module.exports = router;

