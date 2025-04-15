const Category = require("../models/categoryModel");
const {fetchExpensesByCategoryId} = require("../services/expensesService");

async function getCategoriesWithTotalPrice() {
  const categories = await Category.find();

  const addTotalPriceToCategory = async (category) => {
    const expenses = await fetchExpensesByCategoryId(category._id);
    const total_price = expenses.reduce(
      (sum, expense) => sum + (expense.amount || 0), 0);
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
module.exports = {createCategory, modifyCategory, getCategoriesWithTotalPrice};

