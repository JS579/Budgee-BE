'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const {uri} = require("./db/connection")
const mongoose = require('mongoose')
const root = require("./routes/root")
const expensesRoutes = require("./routes/ExpensesRoutes")

// Pass --options via CLI arguments in command to enable these options.
const options = {}

mongoose.connect(uri, {bufferCommands: false});

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  fastify.register(root)
  fastify.register(expensesRoutes)

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
//   fastify.register(AutoLoad, {
//     dir: path.join(__dirname, 'routes'),
//     options: Object.assign({}, opts)
//   })
}

module.exports.options = options
