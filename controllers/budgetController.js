const Budgets = require("../models/budgetModel");
const { findById } = require("../models/categoryModel");
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

async function getBudgetById(request, reply) {
    try {
        const id = request.params.id;
        const budget = await Budgets.findById(id);
        reply.code(200).send(budget);
      } catch (error) {
        reply.code(500).send({error: error.message});
      }
    }

async function addNewBudget(request, reply) {
  try {
    const budget = new Budgets(request.body);
    const budgetAdded = await budget.save();
    return budgetAdded;
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}


async function updateBudget(request, reply) {
  try {
    if(request.body.budget){

      const budget = await Budgets.findById(request.params.id)
      const difference = budget.budget - request.body.budget
      budget.remaining -= difference
          await budget.save()
    }

    const budget = await Budgets.findByIdAndUpdate(
      request.params.id,
      request.body,
      {new: true}
    );
    return budget;
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}

async function deleteBudget(request, reply) {
  try {
    await Budgets.findByIdAndDelete(request.params.id);
    reply.status(204);
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}



module.exports = {
  getAllBudgets, getBudgetById, addNewBudget, updateBudget, deleteBudget
};

