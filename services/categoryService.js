const Category = require("../models/categoryModel");

async function createCategory({name, description, colour_id}) {
  const newCategory = new Category({name, description, colour_id});
  return await newCategory.save();
}

async function modifyCategory(category_id, {name, description, colour_id}) {
  const category = await Category.findById(category_id);
  if (!category) {
    throw new Error("Category not found");
  }
  if (name !== undefined) category.name = name;
  if (description !== undefined) category.description = description;
  if (colour_id !== undefined) category.colour_id = colour_id;
  return await category.save();
}
module.exports = {createCategory, modifyCategory};

