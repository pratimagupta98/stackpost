const express = require("express");
const router = express.Router();
 
//console
const {
    add_fb_post,
    history,
    delete_post,
    Profile,
    auto_schedule,
    auto_schedule_list,
    get_profile_key,
    create_profile_key,
    add_instagram_post,
    youtube_post
    
} = require("../controller/add_fb_profile");

 
 
 router.post("/user/add_fb_post", add_fb_post);
 router.get("/user/history", history);
 router.delete("/user/delete_post", delete_post);
 router.get("/user/Profile", Profile);

 router.post("/user/auto_schedule", auto_schedule);
 router.get("/user/auto_schedule_list", auto_schedule_list);
 router.get("/user/get_profile_key", get_profile_key);
 router.post("/user/create_profile_key", create_profile_key);
 router.post("/user/add_instagram_post", add_instagram_post);
 router.post("/user/youtube_post", youtube_post);




 

 
 

module.exports = router;

