const express = require("express");
const router = express.Router();

const {
	signup,
	login,
	loginWithGoogle,
	loginWithLinkedin,
	loginWithFaceBook,
} = require("../controller/user");

router.post("/user/signup", signup);
router.post("/user/login", login);
router.post("/user/social_login", loginWithGoogle);
router.post("/user/linkedin_login", loginWithLinkedin);
router.post('/user/facebook_login',loginWithFaceBook)

const passport = require("passport");
//var passportConfig = require('../config/passport');

//setup configuration for facebook login
//passportConfig();

//router.post('/auth/facebook',passport.authenticate('facebookToken', { session: false }), login_fb.facebookOAuth);

module.exports = router;
