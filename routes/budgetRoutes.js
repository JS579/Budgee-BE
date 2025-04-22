"use strict";
const {
  getAllBudgets,
  getBudgetById,
  addNewBudget,
  updateBudget,
  deleteBudget,
  getBudgetsByUsername,
} = require("../controllers/budgetController");

const budgetRoutes = async (fastify, opts) => {
  fastify.get("/api/budgets", getAllBudgets);
  fastify.get("/api/budgets/:id", getBudgetById);
  fastify.get("/api/:username/budgets", getBudgetsByUsername);
  fastify.post("/api/budgets", addNewBudget);
  fastify.patch("/api/budgets/:id", updateBudget);
  fastify.delete("/api/budgets/:id", deleteBudget);
};

module.exports = budgetRoutes;

