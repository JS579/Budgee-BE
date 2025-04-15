const mongoose = require("mongoose");

const colourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hex_code: {
      type: String,
      required: true,
      match: /^#([0-9A-Fa-f]{6})$/,
    },
  },
  {
    versionKey: false,
  }
);

const Colour = mongoose.model("Colour", colourSchema);

module.exports = Colour;

