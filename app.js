 const express = require("express");
  const cors = require("cors");
//  const fs = require("fs");
  const app = express();


 require("dotenv").config();
 const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// const session = require('express-session');
 const passport = require('passport');
 const FacebookStrategy = require('passport-facebook').Strategy;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// //require
  
// const routes = require("./routes/userRoute")
// const config = require('./config')
 
 
// app.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: 'SECRET'
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

 
// app.set('view engine', 'ejs');

// app.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: 'SECRET'
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });
 

 
// app.set('view engine', 'ejs');

// app.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: 'SECRET'
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });

//use

 
// app.use('/', routes);
// // app.get("/", (req, res) => {
// //   res.send("Hello World!");
// // });

// require
const user = require("./routes/user")
const workspace = require("./routes/workspace")
const add_fb_profile = require("./routes/add_fb_profile")
const media = require("./routes/media")
const label = require("./routes/label")
const compose = require("./routes/compose")
const create_goal = require("./routes/create_goal")
const comment = require("./routes/comment")
const campaign = require("./routes/campaign")
const myjournal = require("./routes/myjournal")
const camp_category = require("./routes/camp_category")
const re_work_space = require("./routes/re_work_space")






// use
app.use("/", user);
app.use("/", workspace);
app.use("/", add_fb_profile);
app.use("/", media);
app.use("/", label);
app.use("/", compose);
app.use("/", create_goal);
app.use("/", comment);
app.use("/", campaign);
app.use("/", myjournal);
app.use("/", camp_category);
app.use("/", re_work_space);








 mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });
  

// // app.listen(process.env.PORT || 9000, () => {
// //   console.log("Example app listening on port 9000");
// // });

// //    http://localhost:5000/admin
// const port = 3000;

// app.listen(port, () => {
//   console.log('App listening on port ' + port);
// });


//import express from "express";
//import { json } from "body-parser";
//import passport from "passport";

//import { connect } from "./utils/db";
//import userRouter from "./user/user.routes";

//const app = express();
//const port = 3000;


app.use(passport.initialize());
 //const userRouter = require("./routes/userRouter")

//app.use(json());
//app.use("/", userRouter);


const userModel = require("./models/userModel");


const facebookStrategy = require('passport-facebook').Strategy
  const session = require('express-session')

  passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : "569258551927541",
    clientSecret    : "8b9fd90474ea14393b3abbe726dfe8a0",
    callbackURL     : "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

        // find the user in the database based on their facebook id
        userModel.findOne({ 'uid' : profile.id }, function(err, user) {

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);

            // if the user is found, then log them in
            if (user) {
                console.log("user found")
                console.log(user)
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                var newuserModel            = new userModel();

                // set all of the facebook information in our user model
                userModel.uid    = profile.id; // set the users facebook id                   
               // newUser.token = token; // we will save the token that facebook provides to the user                    
               userModel.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
               userModel.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
             //   newUser.gender = profile.gender
             userModel.pic = profile.photos[0].value
                // save our user to the database
                userModel.save(function(err) {
                    if (err)
                        throw err;

                    // if successful, return the new user
                    return done(null, userModel);
                });
            }

        });

    })

}));
app.get('/facebook/callback',passport.authenticate('facebook',{
  successRedirect:'/profile',
  failureRedirect:'/failed'
}))
app.get('/profile',(req,res)=>{
  res.send("you are valid user")
})
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
const port = 3000;




const HttpClient = require("./HttpClient.js");

//import HttpClient from "./HttpClient.mjs"
app.post("/fb_login", async (req, res) => {
  console.log("USAER")
const FB_ID = "569258551927541";
const FB_SECRET = "8b9fd90474ea14393b3abbe726dfe8a0";
const FB_APP_TOKEN = "EAAIFvNXF4vUBAE2JZC3D0QSgpjEd5tTl7imKjWdErTSXITjICG4rk2UltngTKUqTGm0dJhELYdkN7khGSfv3cZAuMP7aNKp7qI8nCerOmiaY5auIbCsRxnHyRC2HL9zR1EsKVjsnz8AIgZAQQEZCg4v29tFYmqd0cdZBWIHulWDzjSgoP8MAxaZA2O7v5ap9RSAdZBkt6LLhzcDKkakQtek";

const buildUrlFbInspectToken = (token) => `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${FB_APP_TOKEN}`
const buildUrlFbMe = (FB_ID_PERSON, token) => `https://graph.facebook.com/${FB_ID_PERSON}?fields=id,name,email&access_token=${token}`

const getDataFromFbUsingAToken = async (data) => {
    try {
        let code = data["token"]; // this is the token from facebook that the user already authorized the app, logged in.
        let redirectUri = data["http://localhost:3000/auth/facebook/callback"];
        let uriX2 = encodeURIComponent(redirectUri);
        //Get another token
        let uri02 = `https://graph.facebook.com/v8.0/oauth/access_token?client_id=${FB_ID}&redirect_uri=${uriX2}&client_secret=${FB_SECRET}&code=${code}`
        let result = await HttpClient.get(uri02);
        let token = result["access_token"];
        //Get the user id from the user.
        let dataFbToken = await HttpClient.get(buildUrlFbInspectToken(token));
        let userFbId = dataFbToken["data"]["user_id"];
        // get the whole data. // Put the data you want in the URL.
        let userData = await HttpClient.get(buildUrlFbMe(userFbId, token));
        console.log("userData",userData)
        return userData;
    } catch (ex) {
        throw ex;
    }
}
})

app.post("/fblogin", async (req, res) => {
    try {
      console.log("user")
        let data = req.body
        console.log("DATA",data)
        let response = await getDataFromFbUsingAToken(data);
        console.log("STRING",response)
        res.json(response);
    } catch (ex) {
      console.log("EX",ex)
        res.json({ "code": 500, "ex": JSON.stringify(ex) })
    }
});





// const { google } = require('googleapis');
// app.post("/auth/facebook/callback", async (req, res) => {
//   accessToken = "EAAIFvNXF4vUBABYm3K6cwE4pqP5ZAfMd1zOR7nnSY078gfRFQRiMYtEbRtIzcFhC0xDoHMycCA9K7YKl9OPj6GXOCB6BcEP7mdLbafNTppuJ6YwEFm4EbYUgmMSGbDfYx9H7Y88qWE0sOeFS8sO92Ka7ctBX8jODuZBRTbR9cS06KZAWIjyOCgv1eZCqh0VllxIFGzQ69QZDZD"
// const auth = new google.auth.OAuth2(
//   '569258551927541',
//   '8b9fd90474ea14393b3abbe726dfe8a0',
//   'http://localhost:3000/auth/facebook/callback'
// );
// console.log("auth",auth)
// async function getGoogleUserProfile( accessToken ) {
//   console.log("token",accessToken)
//   const people = google.people({ version: 'v1', auth });
//   console.log("people",people)
//   const userProfile = await people.people.get({
//     resourceName: 'people/me',
//     personFields: 'names,locations' 
//   });
//   return userProfile.data;
// // console.log("STRING",getGoogleUserProfile())
// //   res.send(200).json({
// // data : userProfile
// //   })
// }
// getGoogleUserProfile()
// })


const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '109381462500-8lja66d0g6srr34sgng051hjnnbmb9cv.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://astrologically.in"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { scope : ['profile', 'email'] }, { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });
  const axios = require("axios")
  app.get("/fblogin_login", async (req, res) => {
    access_token = "EAAIFvNXF4vUBAAadWJy9bLFBKMqjEvI4XMMvW0ZCWeOsu4ZCwJkD9755BTi9wcBMf3HkQhyvIX1IxqTn5Bz4kMvi8dBx9d49bKkqiDtBPjRO6R0cQiv64yYf1ZCufgqHZBVJCoLsiJs7iBV5BiM0llbfR0Y4QBbZC1rK5jFpPfCWbJ1p9zPlR7acVSgkWpHUTbJJOJJgGhTN2ZA9ZBwyMP1"
    async function getGoogleUserInfo(access_token) {
      const { data } = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("data",data); // { id, email, given_name, family_name }
      return data;
  };
 console.log("USER" ,getGoogleUserInfo())
  })



  


app.listen(port, () => {
  console.log('App listening on port ' + port);
});