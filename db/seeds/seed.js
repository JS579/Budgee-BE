const Fastify = require("fastify");
const {dbConnection} = require("../connection");

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

    const {insertedIds: colourIds} = await coloursCol.insertMany(coloursData);

    const categoriesWithColourIds = categoriesData.map((category, index) => ({
      ...category,
      colour_id: colourIds[Object.keys(colourIds)[index]],
    }));

    const {insertedIds: categoryIds} = await categoriesCol.insertMany(
      categoriesWithColourIds
    );

    await usersCol.insertMany(usersData);

    const budgetsWithUsernames = budgetsData.map((budget, index) => ({
      ...budget,
      username: usersData[index % usersData.length].username,
      remaining: budget.budget,
    }));

    const {insertedIds: budgetIds} = await budgetsCol.insertMany(
      budgetsWithUsernames
    );

    const expensesWithAssociations = expensesData.map((expense, index) => ({
      ...expense,
      category_id:
        categoryIds[Object.keys(categoryIds)[index % categoriesData.length]],
      budget_id: budgetIds[Object.keys(budgetIds)[index % budgetsData.length]],
    }));

    await expensesCol.insertMany(expensesWithAssociations);

    const budgetEntries = Object.entries(budgetIds);
    for (const [index, budgetId] of budgetEntries) {
      const expenses = await expensesCol.find({budget_id: budgetId}).toArray();
      const totalExpenses = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      await budgetsCol.updateOne(
        {_id: budgetId},
        {$set: {remaining: budgetsData[index].budget - totalExpenses}}
      );
    }

    const categoryEntries = Object.entries(categoryIds);
    for (const [categoryId] of categoryEntries) {
      const expenses = await expensesCol
        .find({category_id: categoryId})
        .toArray();
      const categoryTotal = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      await categoriesCol.updateOne(
        {_id: categoryId},
        {$set: {total_amount: categoryTotal}}
      );
    }

    console.log("Database seeded successfully");
    await fastify.close();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

module.exports = seed;


