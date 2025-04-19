const mongoose = require("mongoose");
const {Schema} = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    colour_id: {
      type: Schema.Types.ObjectId,
      ref: "Colour",
      required: true,
    },
    total_amount: {type: Number, default: 0},
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Category", categorySchema);


