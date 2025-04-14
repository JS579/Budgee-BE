const {getAllCategories, postCategory} = require("../controllers/categoriesController")

const categoriesRoutes = async (fastify, opts) => {
    fastify.get("/categories", getAllCategories);
    fastify.post("/categories", postCategory);
    // fastify.patch("/categories", patchCategory)
    // fastify.delete("/categories", deleteCategory);
};






module.exports = categoriesRoutes; 