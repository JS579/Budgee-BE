const mongoose = require('mongoose')
const { Schema } = mongoose


const expensesSchema = new Schema(
    {
        date: {
            type: String,
            required: true,
        },
        
        amount: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            required: true,
        }
}
)

module.exports = mongoose.model("Expenses", expensesSchema)
