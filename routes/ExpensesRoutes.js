"use strict";
const {
  getAllExpenses,
  getExpensesByBudgetIdAndCategoryId,
  addNewExpense,
  updateExpense,
  deleteExpense,
  getExpensesByCategoryId,
} = require("../controllers/expensesControllers");

const expensesRoutes = async (fastify, opts) => {
  fastify.get("/api/expenses", getAllExpenses);
  fastify.get("/api/expenses/category/:category_id", getExpensesByCategoryId);
  fastify.get(
    "/api/expenses/:budget_id/:category_id",
    getExpensesByBudgetIdAndCategoryId
  );
  fastify.post("/api/expenses", addNewExpense);
  fastify.patch("/api/expenses/:id", updateExpense);
  fastify.delete("/api/expenses/:id", deleteExpense);
};

module.exports = expensesRoutes;
