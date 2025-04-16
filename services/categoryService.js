const Category = require("../models/categoryModel");
const {fetchExpensesByCategoryId} = require("../services/expensesService");

async function getCategoriesWithTotalPrice() {
  const categories = await Category.find();

  const addTotalPriceToCategory = async (category) => {
    const expenses = await fetchExpensesByCategoryId(category._id);
    const total_price = expenses.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );
    return {
      ...category.toObject(),
      total_price,
    };
  };

  const categoriesWithTotalPrice = await Promise.all(
    categories.map(addTotalPriceToCategory)
  );

  return categoriesWithTotalPrice;
}

async function createCategory({name, description, colour_id}) {
  if (!name || !description || !colour_id) {
    const error = new Error("Bad Request: Missing required field(s)");
    error.statusCode = 400;
    throw error;
  }

  const newCategory = new Category({name, description, colour_id});
  return await newCategory.save();
}

async function modifyCategory(category_id, {name, description, colour_id}) {
  if (name !== undefined && typeof name !== "string") {
    throw Object.assign(new Error("Bad Request: Invalid data type"), {
      statusCode: 400,
    });
  }
  if (description !== undefined && typeof description !== "string") {
    throw Object.assign(new Error("Bad Request: Invalid data type"), {
      statusCode: 400,
    });
  }

  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (colour_id !== undefined) updateData.colour_id = colour_id;

  const updatedCategory = await Category.findByIdAndUpdate(
    category_id,
    updateData,
    {new: true, runValidators: true}
  );

  if (!updatedCategory) {
    throw Object.assign(new Error("Category not found"), {statusCode: 404});
  }

  return updatedCategory;
}
module.exports = {createCategory, modifyCategory, getCategoriesWithTotalPrice};


