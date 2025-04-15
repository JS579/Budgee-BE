'use strict'

const { getAllUsers } = require("../controllers/usersControllers")

async function userRoutes(fastify){
  fastify.get('/users', getAllUsers)

}

exports.default = userRoutes
  

