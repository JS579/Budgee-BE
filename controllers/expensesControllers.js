const Expenses = require("../models/expensesModels")

async function getAllExpenses(request, reply){
try {
    const allExpenses = await Expenses.find()
    
    reply.send(allExpenses)
} catch (error) {
    reply.code(500).send({error: error.message})
}
}




module.exports = getAllExpenses 