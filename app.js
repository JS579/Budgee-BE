"use strict";

const path = require("node:path");
const AutoLoad = require("@fastify/autoload");
const {uri} = require("./db/connection");
const mongoose = require("mongoose");
const categoriesRoutes = require("./routes/categoriesRoutes");
const root = require("./routes/root");
const expensesRoutes = require("./routes/ExpensesRoutes");
const budgetRoutes = require("./routes/budgetRoutes")
const coloursRoutes = require("./routes/colourRoutes")

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

const {uri} = require("./db/connection")
const mongoose = require('mongoose')
const usersRoutes = require("./routes/UsersRoutes")

// Pass --options via CLI arguments in command to enable these options.
const options = {};
const options = {}

console.log("uri>>>", uri)

mongoose.connect(uri, {bufferCommands: false});

module.exports = async function (fastify, opts) {
  try {
    await mongoose.connect(uri, {bufferCommands: false});
    fastify.register(root);
    fastify.register(expensesRoutes);
    fastify.register(categoriesRoutes);
    fastify.register(budgetRoutes);
    fastify.register(coloursRoutes)


    // Do not touch the following lines
 
  fastify.register(usersRoutes)

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
      dir: path.join(__dirname, "plugins"),
      options: Object.assign({}, opts),
    });
  } catch (err) {
    fastify.log.error("Error connecting to MongoDB:", err.message);
    throw err;
  }

  // This loads all plugins defined in routes
  // define your routes in one of these
  //   fastify.register(AutoLoad, {
  //     dir: path.join(__dirname, 'routes'),
  //     options: Object.assign({}, opts)
  //   })
};

module.exports.options = options;
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
}

