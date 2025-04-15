const Category = require("../models/categoryModel");
const {createCategory, modifyCategory} = require("../services/categoryService");

async function getAllCategories(request, reply) {
  try {
    const allCategories = await Category.find();
    reply.code(200).send(allCategories);
  } catch (error) {
    reply.code(500).send({error: error.message});
  }
}

async function postCategory(request, reply) {
  try {
    const {name, description, colour_id} = request.body;

    const savedCategory = await createCategory({name, description, colour_id});
    reply.code(201).send(savedCategory);
  } catch (error) {
    reply.code(400).send({error: error.message});
  }
}

async function patchCategory(request, reply) {
  try {
    const {category_id} = request.params;
    const {name, description, colour_id} = request.body;
    const updatedCategory = await modifyCategory(category_id, {
      name,
      description,
      colour_id,
    });
    reply.code(200).send(updatedCategory);
  } catch (error) {
    reply.code(400).send({error: error.message});
  }
}

async function deleteCategory(request, reply) {
  try {
    const {category_id} = request.params;
    await Category.findByIdAndDelete(category_id);
    reply.code(204).send(category_id);
  } catch (error) {
    reply.code(404).send({error: error.message});
  }
}

module.exports = {
  getAllCategories,
  postCategory,
  patchCategory,
  deleteCategory,
};

