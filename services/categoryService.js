const Category = require("../models/categoryModel");

async function createCategory({name, description, colour_id}) {
  const newCategory = new Category({name, description, colour_id});
  return await newCategory.save();
}

async function modifyCategory(category_id, {name, description, colour_id}) {
  const updtedCategory = await Category.findByIdAndUpdate(
    category_id,
    {
      name,
      description,
      colour_id,
    },
    {new: true}
  );
  if (!updtedCategory) {
    throw new Error("Category not found");
  }
  return updtedCategory;
}
module.exports = {createCategory, modifyCategory};

