'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

const {uri} = require("./db/connection")
const mongoose = require('mongoose')
const usersRoutes = require("./routes/UsersRoutes")

const options = {}

console.log("uri>>>", uri)

mongoose.connect(uri, {bufferCommands: false});

module.exports = async function (fastify, opts) {
 
  fastify.register(usersRoutes)

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
}

module.exports.options = options
