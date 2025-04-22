const getApp = require("../tests.setup");
const request = require("supertest");

describe("ENDPOINT: /api/expenses", () => {
  let app;
  let expensesCollection;
  let budgetsCollection;
  let categoriesCollection;

  beforeAll(async () => {
    app = await getApp();
    expensesCollection = await app.mongo.db.collection("expenses");
    budgetsCollection = await app.mongo.db.collection("budgets");
    categoriesCollection = await app.mongo.db.collection("categories");
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET: /api/expenses", () => {
    test("Returns an array of all expenses", async () => {
        const {
            body: {allExpenses},
          } = await request(app.server).get("/api/expenses").expect(200);


      expect(allExpenses.length).not.toBe(0);
      allExpenses.forEach((expense) => {
        expect(expense).toHaveProperty("_id");
        expect(expense).toHaveProperty("amount");
        expect(expense).toHaveProperty("description");
        expect(expense).toHaveProperty("date");
        expect(expense).toHaveProperty("category_id");
        expect(expense).toHaveProperty("budget_id");
      });
    });
  });
})