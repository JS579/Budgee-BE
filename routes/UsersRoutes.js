'use strict'
const {getAllUsers} = require("../controllers/usersControllers")

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })


  fastify.get('/users', getAllUsers)
};

