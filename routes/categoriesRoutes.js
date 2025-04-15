const {
  getAllCategories,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

const categoriesRoutes = async (fastify, opts) => {
  fastify.get("/categories", getAllCategories);
  fastify.post("/categories", postCategory);
  fastify.patch("/categories/:category_id", patchCategory);
  fastify.delete("/categories/:category_id", deleteCategory);
};

module.exports = categoriesRoutes;
