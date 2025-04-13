const mongoose = require('mongoose')
const { Schema } = mongoose


const expensesSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        }
}
)

module.exports = mongoose.model("Expenses", expensesSchema)