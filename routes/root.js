'use strict'
const {getAllExpenses} = require("../controllers/expensesControllers")

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
  fastify.get('/expenses', getAllExpenses)
}
