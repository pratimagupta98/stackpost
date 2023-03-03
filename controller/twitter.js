const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:3000/auth/twitter/callback',
  passReqToCallback: true
}, (req, token, tokenSecret, profile, done) => {
  process.nextTick(() => {
    if (!req.user) {
      User.findOne({ 'twitter.id': profile.id }, (err, user) => {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.twitter.id = profile.id;
          newUser.twitter.token = token;
          newUser.twitter.username = profile.username;
          newUser.twitter.displayName = profile.displayName;

          newUser.save((err) => {
            if (err) return done(err);
            return done(null, newUser);
          });
        }
      });
    } else {
      const user = req.user;
      user.twitter.id = profile.id;
      user.twitter.token = token;
      user.twitter.username = profile.username;
      user.twitter.displayName = profile.displayName;

      user.save((err) => {
        if (err) return done(err);
        return done(null, user);
      });
    }
  });
}));