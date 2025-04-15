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
  fastify.get("/expenses", getAllExpenses);
  fastify.get("/expenses/category/:category_id", getExpensesByCategoryId);
  fastify.get(
    "/expenses/:budget_id/:category_id",
    getExpensesByBudgetIdAndCategoryId
  );
  fastify.post("/expenses", addNewExpense);
  fastify.patch("/expenses/:id", updateExpense);
  fastify.delete("/expenses/:id", deleteExpense);
};

module.exports = expensesRoutes;
