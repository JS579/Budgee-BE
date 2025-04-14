'use strict'
const getAllExpenses = require("../controllers/expensesControllers")

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
}
const expensesRoutes = async (fastify, opts) => {
  fastify.get('/expenses', getAllExpenses)
}


module.exports = expensesRoutes 