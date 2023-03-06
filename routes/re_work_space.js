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
    repo_WorkSpace,
    repo_workSpace_list,
    repo_dlt_workspace,
   repo_viewone_workspace
    
} = require("../controller/re_work_space");
const { response } = require("express");


 
 router.post("/user/repo_WorkSpace", repo_WorkSpace);
 router.get("/user/repo_workSpace_list", repo_workSpace_list);
 router.get("/user/repo_dlt_workspace/:id", repo_dlt_workspace);
 router.get("/user/repo_viewone_workspace/:id", repo_viewone_workspace);



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

