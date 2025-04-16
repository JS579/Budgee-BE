'use strict'

const { getAllUsers,getUserById,updateUser,createUser,deleteUser } = require("../controllers/usersControllers")

async function userRoutes(fastify){
  fastify.get('/api/users', getAllUsers)
  fastify.get('/api/users/:id', getUserById);
  fastify.post('/api/users',createUser)
  fastify.patch('/api/users/:id',updateUser)
  fastify.delete('/api/users/:id',deleteUser)
}

module.exports = userRoutes
  

