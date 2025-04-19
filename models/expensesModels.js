const mongoose = require("mongoose");
const {Schema} = mongoose;

const expensesSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    budget_id: {
      type: Schema.Types.ObjectId,
      ref: "Budget",
      required: true,
    },
   
    
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Expenses", expensesSchema);
