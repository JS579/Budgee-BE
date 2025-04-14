import Expenses from "../models/expensesModels.js"

// Expenses.find().then((data)=>{
//     console.log(data)
// }).catch((error)=>{
//     console.error(error.message)
// })

async function getExpenses(){
   return await Expenses.find()
} 

export default getExpenses

// const foundExpenses = await getExpenses()

// console.log(foundExpenses)