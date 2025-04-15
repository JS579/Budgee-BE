const {
  getAllCategories,
  postCategory,
  patchCategory,
} = require("../controllers/categoriesController");

const categoriesRoutes = async (fastify, opts) => {
    fastify.get("/categories", getAllCategories);
    fastify.post("/categories", postCategory);
    fastify.patch("/categories/:category_id", patchCategory)
    // fastify.delete("/categories", deleteCategory);
};







module.exports = categoriesRoutes; 