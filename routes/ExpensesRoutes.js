'use strict'
const { getAllExpenses, getExpenseById, addNewExpense } = require("../controllers/expensesControllers")


const expensesRoutes = async (fastify, opts) => {
  fastify.get('/expenses', getAllExpenses)
  fastify.get('/expenses/:id', getExpenseById)
  fastify.post('/expenses', addNewExpense)
}


module.exports = expensesRoutes