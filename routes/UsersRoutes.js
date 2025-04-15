'use strict'

const { getAllUsers,getUserById,updateUser,createUser,deleteUser } = require("../controllers/usersControllers")

async function userRoutes(fastify){
  fastify.get('/users', getAllUsers)
  fastify.get('/users/:id', getUserById);
  fastify.post('/users',createUser)
fastify.patch('/users/:id',updateUser)
fastify.delete('/users/:id',deleteUser)
}

exports.default = userRoutes
  

