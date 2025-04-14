'use strict'
const { getAllExpenses, getExpenseById } = require("../controllers/expensesControllers")


const expensesRoutes = async (fastify, opts) => {
  fastify.get('/expenses', getAllExpenses)
  fastify.get('/expenses/:id', getExpenseById)
}


module.exports = expensesRoutes