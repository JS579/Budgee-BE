"use strict";
const {
  getAllBudgets,
} = require("../controllers/budgetController");

const budgetRoutes = async (fastify, opts) => {
  fastify.get("/budgets", getAllBudgets);
};

module.exports = budgetRoutes;
