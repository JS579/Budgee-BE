const Fastify = require("fastify");
const connectDatabase = require("../connection");

const colours = [
  {name: "Red", hex_code: "#FF0000"},
  {name: "Green", hex_code: "#00FF00"},
  {name: "Blue", hex_code: "#0000FF"},
  {name: "Yellow", hex_code: "#FFFF00"},
  {name: "Purple", hex_code: "#800080"},
  {name: "Orange", hex_code: "#FFA500"},
  {name: "Pink", hex_code: "#FFC0CB"},
  {name: "Black", hex_code: "#000000"},
  {name: "White", hex_code: "#FFFFFF"},
  {name: "Gray", hex_code: "#808080"},
];

const seed = async () => {
  try {
    const fastify = Fastify({logger: true});
    await connectDatabase(fastify);
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

    await coloursCol.insertMany(colours);
      console.log("Collections colours created");
      await usersCol.insertMany(users);
      await budgetsCol.insertMany(budgets);
      await categoriesCol.insertMany(categories);
      //TODO: insert budget and cat Id)
      await expensesCol.insertMany(expensesToInsert);
      process.exit(0);
  } catch(err){
      console.log(err)
  }
};

module.exports = seed





