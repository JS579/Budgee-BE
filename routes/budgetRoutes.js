"use strict";
const {
  getAllBudgets, getBudgetById, addNewBudget, updateBudget, deleteBudget
} = require("../controllers/budgetController");

const budgetRoutes = async (fastify, opts) => {
  fastify.get("/api/budgets", getAllBudgets);
  fastify.get("/api/budgets/:id", getBudgetById)
  fastify.post("/api/budgets", addNewBudget)
  fastify.patch("/api/budgets/:id", updateBudget)
  fastify.delete("/api/budgets/:id", deleteBudget)
};

module.exports = budgetRoutes;
