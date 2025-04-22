const getApp = require("../tests.setup");
const request = require("supertest");

describe("ENDPOINT: /api/budgets", () => {
  let app;
  let budgetsCollection;

  beforeAll(async () => {
    app = await getApp();
    budgetsCollection = await app.mongo.db.collection("budgets");
  });

  describe("GET: /api/budgets", () => {
    test("Returns an array of all budgets", async () => {
        const {
            body: {allBudgets},
          } = await request(app.server).get("/api/budgets").expect(200);


      expect(allBudgets.length).not.toBe(0);
      allBudgets.forEach((budget) => {
        expect(budget).toHaveProperty("_id");
        expect(budget).toHaveProperty("budget");
        expect(budget).toHaveProperty("start_date");
        expect(budget).toHaveProperty("end_date");
        expect(budget).toHaveProperty("remaining");
        expect(budget).toHaveProperty("username");
      });
    });
  });
})