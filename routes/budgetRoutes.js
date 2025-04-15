"use strict";
const {
  getAllBudgets, getBudgetById, addNewBudget, updateBudget, deleteBudget
} = require("../controllers/budgetController");

const budgetRoutes = async (fastify, opts) => {
  fastify.get("/budgets", getAllBudgets);
  fastify.get("/budgets/:id", getBudgetById)
  fastify.post("/budgets", addNewBudget)
  fastify.patch("/budgets/:id", updateBudget)
  fastify.delete("/budgets/:id", deleteBudget)
};

module.exports = budgetRoutes;
