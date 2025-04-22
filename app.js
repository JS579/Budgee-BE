const {uri} = require("./db/connection");
const mongoose = require("mongoose");
const cors = require("@fastify/cors");
const { root, categoriesRoutes, expensesRoutes, budgetRoutes, coloursRoutes, userRoutes} = require("./routes/indexRoutes")




module.exports = async function (fastify, opts) {
  try {
      await fastify.register(cors, {
        origin: "*"
      });
    
    await mongoose.connect(uri, {bufferCommands: false});
    fastify.register(root);
    fastify.register(categoriesRoutes);
    fastify.register(expensesRoutes);
    fastify.register(budgetRoutes);
    fastify.register(coloursRoutes);
    fastify.register(userRoutes);

  } catch (err) {
    fastify.log.error("Error connecting to MongoDB:", err.message);
    throw err;
  }
};





