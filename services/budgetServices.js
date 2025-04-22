const Budget = require("../models/budgetModel");

async function fetchExpensesByCategoryId(category_id) {
  return await Budget.find({category_id});
}

async function fetchExpensesByBudgetIdAndCategoryId(budget_id, category_id) {
  const expenses = await Budget.find({category_id, budget_id});
  return expenses;
}

async function createNewBudget(budget, start_date, end_date, username) {
  if (!budget || !start_date || !end_date || !username) {
    const error = new Error("Bad Request: Missing required field(s)");
    error.statusCode = 400;
    throw error;
  }

  const newBudget = new Budget({
    budget,
    start_date,
    end_date,
    username,
  });
  return await newBudget.save();
}

async function modifyBudget(budgetId, updatedData) {
  if (updatedData.budget !== undefined) {
    const budget = await Budget.findOne({where: {_id: budgetId}, raw: false});
    if (!budget) {
      const error = new Error("Budget not found");
      error.statusCode = 404;
      throw error;
    }

    const difference = budget.budget - updatedData.budget;
    budget.remaining -= difference;
    await budget.save();
  }

  const updatedBudget = await Budget.findByIdAndUpdate(budgetId, updatedData, {
    new: true,
  });

  return updatedBudget;
}

module.exports = {
  fetchExpensesByBudgetIdAndCategoryId,
  fetchExpensesByCategoryId,
  createNewBudget,
  modifyBudget,
};

