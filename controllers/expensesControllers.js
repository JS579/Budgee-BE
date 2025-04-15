const Expenses = require("../models/expensesModels");
const {
  fetchExpensesByBudgetIdAndCategoryId,
  fetchExpensesByCategoryId,
} = require("../services/expensesService");

async function getAllExpenses(request, reply) {
  try {
    const allExpenses = await Expenses.find();
    reply.send(allExpenses);
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}

async function getExpensesByBudgetIdAndCategoryId(request, reply) {
  try {
    const {category_id, budget_id} = request.params;
    const expenses = await fetchExpensesByBudgetIdAndCategoryId(
      budget_id,
      category_id
    );
    reply.code(200).send(expenses);
  } catch (error) {
    reply.code(500).send({error: error.message});
  }
}

async function getExpensesByCategoryId(request, reply) {
  try {
    const {category_id} = request.params;
    const expenses = await fetchExpensesByCategoryId(category_id);
    reply.code(200).send(expenses);
  } catch (error) {
    reply.code(500).send({error: error.message});
  }
}

async function addNewExpense(request, reply) {
  try {
    const expense = new Expenses(request.body);
    const expenseAdded = await expense.save();
    return expenseAdded;
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}

async function updateExpense(request, reply) {
  try {
    const expense = await Expenses.findByIdAndUpdate(
      request.params.id,
      request.body,
      {new: true}
    );
    return expense;
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}

async function deleteExpense(request, reply) {
  try {
    await Expenses.findByIdAndDelete(request.params.id);
    reply.status(204);
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}

module.exports = {
  getAllExpenses,
  getExpensesByBudgetIdAndCategoryId,
  addNewExpense,
  updateExpense,
  deleteExpense,
  getExpensesByCategoryId,
};

