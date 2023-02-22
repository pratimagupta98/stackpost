
const User = require("../models/user");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");


  exports.signup= async (req, res) => {
    const { email,mobile,password} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      
        email:email,
        mobile:mobile,
        password:hashPassword
     });
    const findexist = await User.findOne({ email: email });
    if (findexist) {
      resp.alreadyr(res);
    } else {
        newUser
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }
  exports.login = async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.findOne({
      //  $or: [{ email: email }, { username: username }],
      $and: [
  
        { $or: [{ email: email }, { username: username }] }
      ]
  
    });
    console.log("user", user);
    if (user) {
  
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        res.status(200).send({
          status: true,
          msg: "success",
          user: user,
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "Incorrect Password",
          error: "error",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "User Doesnot Exist",
        error: "error",
      });
    }
  }; 
  





  const passport = require('passport');
const facebookTokenStrategy = require('passport-facebook-token');
const Usser = require('../models/fbUser');
exports.login_fb = async (req, res) => {
    passport.use('facebookToken', new facebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            const existingUser = await Usser.findOne({ 'facebook.id': profile.id });

            if(existingUser) {
                return done(null, existingUser);
            }

            const newUser = new Usser({
                method: 'facebook',
                facebook: {
                    id: profile.id,
                    email: profile.emails[0].value,
                    token: accessToken
                }
            });
console.log("newUser",newUser)
            await newUser.save();
            done(null, newUser);

        } catch(error) {
            done(error, false);
        }
    }));
};
