const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:String,
  name: String,
  email: String,
  avatar:String,
  preferences:String
});

module.exports = mongoose.model('users', userSchema);
