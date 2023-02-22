const express = require("express");
const router = express.Router();
 

const {
    signup,
    login,
    login_fb
} = require("../controller/user");

 
 
 router.post("/user/signup", signup);
 router.post("/user/login", login);
 //router.post("/user/login_fb", login_fb);


  const passport = require('passport');
//var passportConfig = require('../config/passport');

//setup configuration for facebook login
//passportConfig();

 

//router.post('/auth/facebook',passport.authenticate('facebookToken', { session: false }), login_fb.facebookOAuth);


module.exports = router;

