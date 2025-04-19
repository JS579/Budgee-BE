const {
  getColours,
  postColour,
  deleteColour,
} = require("../controllers/colourControllers");

const coloursRoutes = async (fastify, opts) => {
  fastify.get("/api/colours", getColours);
  fastify.post("/api/colours", postColour);
  fastify.delete("/api/colours/:colour_id", deleteColour);
};

module.exports = coloursRoutes;

