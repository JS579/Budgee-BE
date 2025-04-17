const Budget = require("../models/budgetModel");
const Expenses = require("../models/expensesModels");
const {
  fetchExpensesByBudgetIdAndCategoryId,
  fetchExpensesByCategoryId,
} = require("../services/expensesService");

async function getAllExpenses(request, reply) {
  try {
    const allExpenses = await Expenses.find();
    reply.send({allExpenses});
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
    reply.code(200).send({expenses});
  } catch (error) {
    reply.code(500).send({error: error.message});
  }
}

async function getExpensesByCategoryId(request, reply) {
  try {
    const {category_id} = request.params;
    const expenses = await fetchExpensesByCategoryId(category_id);
    reply.code(200).send({expenses});
  } catch (error) {
    reply.code(500).send({error: error.message});
  }
}

async function addNewExpense(request, reply) {
  try {
    const {budget_id, amount} = request.body;

    if (!budget_id || amount === undefined) {
      return reply
        .status(400)
        .send({error: "budget_id and amount are required"});
    }
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      return reply.status(400).send({error: "Amount must be a number"});
    }
    const budget = await Budget.findById(budget_id);
    if (!budget) {
      return reply.status(404).send({error: "Budget not found"});
    }
    if (isNaN(budget.remaining)) {
      budget.remaining = 0;
    }
    if (numericAmount > budget.remaining) {
      return reply.status(400).send({error: "Insufficient remaining budget"});
    }
    budget.remaining -= numericAmount;
    await budget.save();

    const expense = new Expenses({
      ...request.body,
      amount: numericAmount,
    });
    const expenseAdded = await expense.save();
    return reply.status(201).send({expenseAdded});
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}

async function updateExpense(request, reply) {
  try {
    if (request.body.amount) {
      const expense = await Expenses.findById(request.params.id);
      const budget = await Budget.findById(expense.budget_id);
      const difference = expense.amount - request.body.amount;
      budget.remaining += difference;
      await budget.save();
    }

    const updatedExpense = await Expenses.findByIdAndUpdate(
      request.params.id,
      request.body,
      {new: true}
    );
    return updatedExpense;
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}

async function deleteExpense(request, reply) {
  try {
    const expense = await Expenses.findById(request.params.id);
    const budget = await Budget.findById(expense.budget_id);
    budget.remaining += expense.amount;
    await budget.save();

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

