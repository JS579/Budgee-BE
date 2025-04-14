const mongoose = require('mongoose')
const { Schema } = mongoose

const uri = process.env.MONGODB_URI;

mongoose.connect("mongodb://localhost:27017/BudgeeDB", {bufferCommands: false});

const expensesSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        }
}
)

module.exports = mongoose.model("Expenses", expensesSchema)