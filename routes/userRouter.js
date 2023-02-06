//import express from "express";
//import passport from "passport";
//import userController from "./user.controller";
const express = require("express");
//const router = express.Router();
const passport = require('passport');
 const FacebookStrategy = require('passport-facebook').Strategy;

const userRouter = express.Router();
const {userController} = require("../controller/userController");

// userRouter.get("/auth/facebook", passport.authenticate("facebook",{failureRedirect:'/failed/login'}),(req,res)=>{
//     console.log("STRING",req.user,req.isAuthenticated())
//     res.send('logged in to facebook')
// });

userRouter.get("/login/fb", passport.authenticate("facebook"))
userRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
  })
);

userRouter.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

userRouter.get("/", (req, res) => {
  res.send("Success");
});
//export default userRouter;

module.exports = userRouter;