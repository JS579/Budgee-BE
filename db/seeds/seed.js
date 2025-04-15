const Fastify = require("fastify");
const { dbConnection } = require("../connection");

const seed = async ({
  budgetsData,
  usersData,
  categoriesData,
  expensesData,
  coloursData,
}) => {
  try {
    const fastify = Fastify({logger: true});
    await dbConnection(fastify);
    const db = fastify.mongo.client.db();

    const usersCol = db.collection("users");
    const budgetsCol = db.collection("budgets");
    const categoriesCol = db.collection("categories");
    const expensesCol = db.collection("expenses");
    const coloursCol = db.collection("colours");

    await Promise.all([
      usersCol.deleteMany({}),
      budgetsCol.deleteMany({}),
      categoriesCol.deleteMany({}),
      expensesCol.deleteMany({}),
      coloursCol.deleteMany({}),
    ]);

    console.log("Collections cleared");

    const {insertedIds: colourIds} = await coloursCol.insertMany(coloursData);
    console.log("Seeded colours");

    const categoriesWithColourIds = categoriesData.map((category, index) => ({
      ...category,
      colour_id: colourIds[Object.keys(colourIds)[index]],
    }));

    const {insertedIds: categoryIds} = await categoriesCol.insertMany(
      categoriesWithColourIds
    );
    console.log("Seeded categories");

    await usersCol.insertMany(usersData);
    console.log("Seeded users");

    const budgetsWithUsernames = budgetsData.map((budget, index) => ({
      ...budget,
      username: usersData[index % usersData.length].username,
    }));

    const {insertedIds: budgetIds} = await budgetsCol.insertMany(
      budgetsWithUsernames
    );
    console.log("Seeded budgets");

    const expensesWithBudgetAndCategoryIds = expensesData.map((expense, index) => ({
      ...expense,
      category_id:
        categoryIds[Object.keys(categoryIds)[index % categoriesData.length]],
      budget_id: budgetIds[Object.keys(budgetIds)[index % budgetsData.length]],
    }));

    await expensesCol.insertMany(expensesWithBudgetAndCategoryIds);

    console.log("Database seeded successfully");
    await fastify.close();
  } catch (err) {
    console.error("Seeding error:", err);
  }
};

module.exports = seed;



