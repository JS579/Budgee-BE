"use strict";

const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true, trim: true},

    email: {type: String, required: true, unique: true, lowercase: true},

    avatar: String,

    preferences: [String],
  },
  {versionKey: false}
);
module.exports = mongoose.model("User", userSchema);

