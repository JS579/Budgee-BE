const Budget = require("../models/budgetModel");
const {
  createNewBudget,
  modifyBudget,
  fetchBudgetsByUsername,
} = require("../services/budgetServices");

async function getAllBudgets(request, reply) {
  try {
    const allBudgets = await Budget.find();
    reply.send({allBudgets});
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}

async function getBudgetById(request, reply) {
  try {
    const id = request.params.id;
    const budget = await Budget.findById(id);
    reply.code(200).send({budget});
  } catch (error) {
    reply.code(500).send({error: error.message});
  }
}

async function getBudgetsByUsername(request, reply) {
  try {
    const {username} = request.params;
    const budgetsByUser = await fetchBudgetsByUsername({username});
    reply.code(200).send({budgetsByUser});
  } catch (error) {
    reply.code(404).send({error: error.message});
  }
}

async function addNewBudget(request, reply) {
  try {
    const {budget, start_date, end_date, username} = request.body;

    const newBudget = await createNewBudget(
      budget,
      start_date,
      end_date,
      username
    );
    reply.code(201).send({newBudget});
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}

async function updateBudget(request, reply) {
  try {
    const updatedBudget = await modifyBudget(request.params.id, request.body);
    return updatedBudget;
  } catch (error) {
    if (error.statusCode === 404) {
      return reply.status(404).send({msg: error.message});
    }

    reply.status(500).send({error: error.message});
  }
}

async function deleteBudget(request, reply) {
  try {
    await Budget.findByIdAndDelete(request.params.id);
    reply.status(204);
  } catch (error) {
    reply.status(500).send({error: error.message});
  }
}

module.exports = {
  getAllBudgets,
  getBudgetById,
  addNewBudget,
  updateBudget,
  deleteBudget,
  getBudgetsByUsername,
};


