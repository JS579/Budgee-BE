const Category = require("../models/categoryModel")
const {createCategory} = require("../services/categoryService");

async function getAllCategories(request, reply){
try {
    const allCategories = await Category.find()
    reply.code(200).send(allCategories);
} catch (error) {
    reply.code(500).send({error: error.message})
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




module.exports = {getAllCategories, postCategory}