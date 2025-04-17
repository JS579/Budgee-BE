const mongoose = require("mongoose");
const { Schema } = mongoose;

const budgetSchema = new Schema(
  {
    budget: {
      type: Number,
      required: true,
    },

    start_date: {
      type: Date,
      required: true,
    },

    end_date: {
      type: Date,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    remaining: {
      type: Number,
      default: function() {
        return this.budget;
    },
  },
},
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Budgets", budgetSchema);
