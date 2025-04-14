const getAllExpenses = require("../controllers/expensesControllers")

const expensesRoutes = async (fastify, opts) => {
  fastify.get('/expenses', getAllExpenses)
}


module.exports = expensesRoutes 