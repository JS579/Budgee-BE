'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const expensesRoutes = require("./routes/ExpensesRoutes")
const {uri} = require("./db/connection")
const mongoose = require('mongoose')
const usersRoutes = require("./routes/UsersRoutes")

// Pass --options via CLI arguments in command to enable these options.
const options = {}

console.log("uri>>>", uri)

mongoose.connect(uri, {bufferCommands: false});

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  fastify.register(expensesRoutes)
  fastify.register(usersRoutes)

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
}

module.exports.options = options
