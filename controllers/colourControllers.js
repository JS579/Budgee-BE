const Colour = require("../models/colourModel");
const {createColour} = require("../services/colourServices");

async function getColours(request, reply) {
  try {
    const colours = await Colour.find();
    reply.code(200).send(colours);
  } catch (error) {
    reply.code(400).send({error: error.message});
  }
}

async function postColour(request, reply) {
  try {
    const {name, hex_code} = request.body;
    const newColour = await createColour({name, hex_code});
    reply.code(201).send({newColour});
  } catch (error) {
    reply.code(400).send({error: error.message});
  }
}

async function deleteColour(request, reply) {
  try {
    const {colour_id} = request.params;
    await Colour.findByIdAndDelete(colour_id);
    reply.code(204).send({colour_id});
  } catch (error) {
    reply.code(404).send({error: error.message});
  }
}

module.exports = {getColours, postColour, deleteColour};

