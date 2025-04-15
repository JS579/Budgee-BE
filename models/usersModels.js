'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  avatar: String,
  preferences: [String]
});

module.exports = mongoose.model('User', userSchema);
