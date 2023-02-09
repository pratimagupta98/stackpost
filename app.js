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

// passport.use(new FacebookStrategy({
//     clientID: config.facebookAuth.clientID,
//     clientSecret: config.facebookAuth.clientSecret,
//     callbackURL: config.facebookAuth.callbackURL,
//     profileFields: ["email", "name"]
//   }, function (accessToken, refreshToken, profile, done) {
//     const { email, first_name, last_name } = profile._json;
//       const userData = {
//         email,
//         firstName: first_name,
//         lastName: last_name
//       };
//       new userModel(userData).save();
//     return done(null, profile);
//   }
// ));
// //use

 
// app.use('/', routes);
// // app.get("/", (req, res) => {
// //   res.send("Hello World!");
// // });

// require
const user = require("./routes/user")
const workspace = require("./routes/workspace")

// use
app.use("/", user);
app.use("/", workspace);



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
 const userRouter = require("./routes/userRouter")

//app.use(json());
app.use("/", userRouter);

const port = 3000;

app.listen(port, () => {
  console.log('App listening on port ' + port);
});