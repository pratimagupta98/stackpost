const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  twitter: {
    id: String,
    token: String,
    username: String,
    displayName: String
  }
});

module.exports = mongoose.model('User', userSchema);