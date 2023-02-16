const express = require("express");
const router = express.Router();
const fetch = require('node-fetch')
const userModel = require("../models/userModel");

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

 router.post("/login_with_facebook", async(req,res)=>{
    const { userID} = req.body

   // console.log( userID)

    const accessToken = "EAAIFvNXF4vUBAKZBsmIEwZBOuMMbkd91wPTINd9HKj0EZAhnnUmP897EvAmmlSHvX404EWJA9OvY5ZAEetfZCGWj8Fnnk4dj3piotkAZAkkJ1WsXYz6JaJyYg9nYxc6zOlTEaYCtcQC5khPdtVR7XNMymcJFMuNrLWkgmjHYMXm4w1mecOuYztNjAFcwTBQFwNtg76GAyMseyR01WUfxTT"
  
    const response =await fetch(`https://graph.facebook.com/v3.1/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`)

    const json = await response.json()
console.log(json)
    if(json.userID == userID){
       const resp = await  userModel.findOne({facebookID:userID})
       if(resp){
        // res.json({status:'ok', data :'you are logged in'})
        res.status(200).json({
            status:'ok',
            msg: "you are logged in",
            data :json
          });
       }else{
        const person = new userModel({
            name :'something',
            facebookID:userID,
            accessToken
        })
        await person.save()
        res.json({status:'ok',data :'you are registered and logged in'})
       }
    }else{
res.json({status:'error',datab :"don't try with us"})
    }
 });





 

 
 

module.exports = router;

