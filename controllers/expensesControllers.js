const Expenses = require("../models/expensesModels")

async function getAllExpenses(request, response){
try {
    let allExpenses = await Expenses.find()
    return allExpenses
} catch (error) {
    console.log(error)
}
}



module.exports = { getAllExpenses }