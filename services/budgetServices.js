const Expenses = require("../models/budgetModel");

async function fetchExpensesByCategoryId(category_id) {
  return await Budgets.find({category_id});
}

async function fetchExpensesByBudgetIdAndCategoryId(budget_id, category_id) {
  const expenses = await Budgets.find({category_id, budget_id});
  return expenses;
}

module.exports = {
  fetchExpensesByBudgetIdAndCategoryId,
  fetchExpensesByCategoryId,
};

