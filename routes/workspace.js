const express = require("express");
const router = express.Router();
const {google} = require('googleapis');
const request = require('request');
const OAuth2Data = require('../credentials.json')
 // clinet id
 //109381462500-8lja66d0g6srr34sgng051hjnnbmb9cv.apps.googleusercontent.com

 //client secret
 // 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
const {
    createWorkSpace,
    workSpace_list,
    dlt_workspace,
    viewone_workspace,
    update_my_myWorkSpace
    
} = require("../controller/workspace");
const { response } = require("express");


 
 router.post("/user/createWorkSpace", createWorkSpace);
 router.get("/user/workSpace_list", workSpace_list);
 router.get("/user/dlt_workspace/:id", dlt_workspace);
 router.get("/user/viewone_workspace/:id", viewone_workspace);
 router.post("/user/update_my_myWorkSpace/:id", update_my_myWorkSpace);



 router.get("/getUrl",(req,res)=>{
    const oauthcClient = new google.auth.OAuth2(
"109381462500-8lja66d0g6srr34sgng051hjnnbmb9cv.apps.googleusercontent.com",
"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",
"http://localhost:3000/google/callback"

    )
    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"]
 
 var url = oauthcClient.generateAuthUrl({
    access_type:"offline",
    scope:scopes,
   // state:JSON.stringify
 })
 request(url,(err,response)=>{
    console.log("error",err)
    console.log("statuscode:",response)
    res.send({url:url})
 })
 })

//  const CLIENT_ID = OAuth2Data.web.client_id;
//   const CLIENT_SECRET = OAuth2Data.web.client_secret;
//   const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

//   const oauth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     REDIRECT_URL,
//     REDIRECT_URL
//   )
// var authed = false
// var scopes = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile"
// router.get('/',(req,res)=>{
//     if(!authed){
//         var url =oauth2Client.generateAuthUrl({
//             access_type:"offline",
//             scope:scopes
//         })
//         res.render("index",{url:url})
//     }
//     res.render("index")
// })
// router.get('/google/callback',(req,res)=>{

// })
module.exports = router;

