const Expenses = require("../models/expensesModels");

async function fetchExpensesByCategoryId(category_id) {
  return await Expenses.find({category_id});
}

async function fetchExpensesByBudgetIdAndCategoryId(budget_id, category_id) {
  const expenses = await Expenses.find({category_id, budget_id});
  return expenses;
}

module.exports = {
  fetchExpensesByBudgetIdAndCategoryId,
  fetchExpensesByCategoryId,
};

