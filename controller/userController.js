const userModel = require("../models/userModel");
const passport = require('passport');
//const dotenv = require('dotenv')
const FacebookStrategy = require('passport-facebook').Strategy;
require("dotenv").config();
//const config = require("dotenv").config();
//import userModel from "../user/user.model";
 const config = require('../config.js')

//const FacebookStrategy = strategy.Strategy;

//dotenv.config();
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
        clientID: config.facebookAuth.clientID,
            clientSecret: config.facebookAuth.clientSecret,
            callbackURL: config.facebookAuth.callbackURL,
      profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name
      };
      new userModel(userData).save();
      done(null, profile);
    }
  )
);