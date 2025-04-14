const Category = require("../models/categoryModel")

async function getAllCategories(request, reply){
try {
    const allCategories = await Category.find()
    reply.send(allCategories);
} catch (error) {
    reply.code(500).send({error: error.message})
}
}





module.exports = getAllCategories 