const Colour = require("../models/colourModel");

async function createColour({name, hex_code}) {
  const newColour = new Colour({name, hex_code});
  return await newColour.save();
}

module.exports = {createColour};

