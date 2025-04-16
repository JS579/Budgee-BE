const Category = require("../models/categoryModel");
const {
  createCategory,
  modifyCategory,
  getCategoriesWithTotalPrice,
} = require("../services/categoryService");

async function getAllCategories(request, reply) {
  try {
    const categories = await getCategoriesWithTotalPrice();
    reply.code(200).send({categories});
  } catch (error) {
    reply.code(500).send({msg: error.message});
  }
}

async function postCategory(request, reply) {
  try {
    const {name, description, colour_id} = request.body;

    const newCategory = await createCategory({name, description, colour_id});
    reply.code(201).send({newCategory});
  } catch (error) {
    reply.code(400).send({msg: error.message});
  }
}

async function patchCategory(request, reply) {
  try {
    const {category_id} = request.params;
    const updateData = request.body;

    const updatedCategory = await modifyCategory(category_id, updateData);
    reply.code(200).send({updatedCategory});
  } catch (error) {
    if (error.statusCode === 400) {
      return reply.code(400).send({msg: error.message});
    }
    if (error.statusCode === 404) {
      return reply.code(404).send({msg: error.message});
    }
    reply.code(500).send({msg: "Internal Server Error"});
  }
}

async function deleteCategory(request, reply) {
  try {
    const {category_id} = request.params;
    const deleted = await Category.findByIdAndDelete(category_id);

    if (!deleted) {
      reply.code(404).send({msg: "Category not found"});
    } else {
      reply.code(204)
    }
  } catch (error) {
    reply.code(500).send({msg: "Internal Server Error"});
  }
}

module.exports = {
  getAllCategories,
  postCategory,
  patchCategory,
  deleteCategory,
};




