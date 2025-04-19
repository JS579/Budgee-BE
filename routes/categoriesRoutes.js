const {
  getAllCategories,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

const categoriesRoutes = async (fastify, opts) => {
  fastify.get("/api/categories", getAllCategories);
  fastify.post("/api/categories", postCategory);
  fastify.patch("/api/categories/:category_id", patchCategory);
  fastify.delete("/api/categories/:category_id", deleteCategory);
};

module.exports = categoriesRoutes;
