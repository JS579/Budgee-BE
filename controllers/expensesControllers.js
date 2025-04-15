const Expenses = require("../models/expensesModels")


async function getAllExpenses(request, reply) {
    try {
        const allExpenses = await Expenses.find()
        reply.send(allExpenses)
    } catch (error) {
        reply.status(500).send({ error: error.message })
    }
}

async function getExpensesByBudgetIdAndCategoryId(request, reply) {
    try {
        const category_id = request.params.category_id
        const budget_id = request.params.budget_id
        const expense = await Expenses.find({ category_id: category_id, budget_id: budget_id })
        return expense
    } catch (error) {
        reply.status(500).send({ error: error.message })
    }
}

async function addNewExpense(request, reply) {
    try {
        const expense = new Expenses(request.body)
        const expenseAdded = await expense.save()
        return expenseAdded
    } catch (error) {
        reply.status(500).send({ error: error.message })
    }
}

async function updateExpense(request, reply) {
    try {
        const expense = await Expenses.findByIdAndUpdate(request.params.id, request.body, {new: true})
        return expense
    } catch (error) {
        reply.status(500).send({ error: error.message })
    }
}

async function deleteExpense(request, reply) {
    try {
        await Expenses.findByIdAndDelete(request.params.id)
        reply.status(204)
    } catch (error) {
        reply.status(500).send({ error: error.message })
    }
}



module.exports = { getAllExpenses, getExpensesByBudgetIdAndCategoryId, addNewExpense, updateExpense, deleteExpense }