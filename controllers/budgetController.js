const Budgets = require("../models/budgetModel");
const {
  fetchExpensesByBudgetIdAndCategoryId,
  fetchExpensesByCategoryId,
} = require("../services/budgetServices");

async function getAllBudgets(request, reply) {
  try {
    const allBudgets = await Budgets.find();
    reply.send(allBudgets);
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}



module.exports = {
  getAllBudgets,
};

