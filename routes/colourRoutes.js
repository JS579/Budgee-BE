const {
  getColours,
  postColour,
  deleteColour,
} = require("../controllers/colourControllers");

const coloursRoutes = async (fastify, opts) => {
  fastify.get("/colours", getColours);
  fastify.post("/colours", postColour);
  fastify.delete("/colours/:colour_id", deleteColour);
};

module.exports = coloursRoutes;

