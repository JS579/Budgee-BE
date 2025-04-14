const Category = require("../models/categoryModel");

async function createCategory({name, description, colour_id}) {
  const newCategory = new Category({name, description, colour_id});
  return await newCategory.save();
}

module.exports = {createCategory};

