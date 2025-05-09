const getApp = require("./tests.setup");

describe("MongoDB connection", () => {
  let app;
  let budgetsCollection;
  let usersCollection;
  let expensesCollection;
  let coloursCollection;
  let categoriesCollection;

  beforeAll(async () => {
    app = getApp();
    budgetsCollection = () => app.mongo.db.collection("budgets");
    usersCollection = () => app.mongo.db.collection("users");
    expensesCollection = () => app.mongo.db.collection("expenses");
    coloursCollection = () => app.mongo.db.collection("colours");
    categoriesCollection = () => app.mongo.db.collection("categories");
  });

  describe("Budgets Collection", () => {
    test("should have 2 budget documents seeded", async () => {
      const count = await budgetsCollection().countDocuments();
      expect(count).toBe(2);
    });

    test("should contain required fields in budget documents", async () => {
      const budget = await budgetsCollection().findOne({username: "lukkaku9"});

      expect(budget).toHaveProperty("_id");
      expect(typeof budget.budget).toBe("number");
      expect(budget.start_date).toBeInstanceOf(Date);
      expect(budget.end_date).toBeInstanceOf(Date);
      expect(typeof budget.username).toBe("string");
      expect(typeof budget.remaining).toBe("number");
    });

    test("should match expected values for a specific budget", async () => {
      const budget = await budgetsCollection().findOne({
        username: "john73",
        budget: 1500,
      });

      expect(budget.budget).toBe(1500);
      expect(budget.username).toEqual("john73");
      expect(budget.start_date).toEqual(new Date("2025-04-01T00:00:00.000Z"));
      expect(budget.end_date).toEqual(new Date("2025-04-30T00:00:00.000Z"));
    });
  });

  describe("Users Collection", () => {
    test("should have 2 user documents seeded", async () => {
      const count = await usersCollection().countDocuments();
      expect(count).toBe(2);
    });

    test("should contain required fields in user documents", async () => {
      const user = await usersCollection().findOne({username: "lukkaku9"});

      expect(user).toHaveProperty("_id");
      expect(typeof user.username).toBe("string");
      expect(typeof user.name).toBe("string");
      expect(typeof user.email).toBe("string");
      expect(typeof user.avatar).toBe("string");
      expect(Array.isArray(user.preferences)).toBe(true);
      expect(user.preferences).toContain("notifications");
    });

    test("should match expected values for a specific user", async () => {
      const user = await usersCollection().findOne({
        username: "john73",
        email: "max@gmail.com",
      });

      expect(user.username).toBe("john73");
      expect(user.name).toEqual("max");
      expect(user.email).toEqual("max@gmail.com");
      expect(user.avatar).toEqual(
        "https://randomuser.me/api/portraits/men/1.jpg"
      );
      expect(user.preferences).toContain("notifications");
      expect(user.preferences).toContain("light_mode");
    });
  });

  describe("Colours Collection", () => {
    test("should have 10 colour documents seeded", async () => {
      const count = await coloursCollection().countDocuments();
      expect(count).toBe(6);
    });

    test("should contain required fields in colour documents", async () => {
      const colour = await coloursCollection().findOne({name: "Red"});

      expect(colour).toHaveProperty("_id");
      expect(typeof colour.name).toBe("string");
      expect(typeof colour.hex_code).toBe("string");
    });

    test("should match expected values for colour Red", async () => {
      const red = await coloursCollection().findOne({name: "Red"});

      expect(red.name).toBe("Red");
      expect(red.hex_code).toBe("#FF0000");
    });

    test("should match expected values for colour Blue", async () => {
      const blue = await coloursCollection().findOne({name: "Blue"});

      expect(blue.name).toBe("Blue");
      expect(blue.hex_code).toBe("#0000FF");
    });
  });
  describe("CATEGORIES Collection", () => {
    test("should have 6 category documents seeded", async () => {
      const count = await categoriesCollection().countDocuments();
      expect(count).toBe(6);
    });

    test("should contain required fields in category documents", async () => {
      const category = await categoriesCollection().findOne({name: "Food"});

      expect(category).toHaveProperty("_id");
      expect(typeof category.name).toBe("string");
      expect(typeof category.description).toBe("string");
      expect(typeof category.total_amount).toBe("number");
      expect(category.colour_id).toBeDefined();
    });

    test("should match expected values for category Food", async () => {
      const food = await categoriesCollection().findOne({name: "Food"});
      const actualColour = await coloursCollection().findOne({
        _id: food.colour_id,
      });

      expect(food.name).toBe("Food");
      expect(food.description).toBe("Groceries, dining out, snacks");
      expect(actualColour.name).toBe("Blue");
    });

    describe("Expenses Collection", () => {
      test("should have 8 expenses documents seeded", async () => {
        const count = await expensesCollection().countDocuments();
        expect(count).toBe(8);
      });
      test("should contain required fields in expense documents", async () => {
        const expense = await expensesCollection().findOne({
          description: "Weekly groceries",
        });

        expect(expense).toHaveProperty("_id");
        expect(typeof expense.description).toBe("string");
        expect(typeof expense.amount).toBe("number");
        expect(expense.date).toBeInstanceOf(Date);
        expect(expense.category_id).toBeDefined();
        expect(expense.budget_id).toBeDefined();
      });

      test("should match all expected fields for 'Restaurant dinner' expense", async () => {
        const expense = await expensesCollection().findOne({
          description: "Restaurant dinner",
        });

        expect(expense).toBeDefined();
        expect(expense.amount).toBe(45);
        expect(expense.description).toBe("Restaurant dinner");
        expect(expense.date instanceof Date).toBe(true);

        const category = await categoriesCollection().findOne({
          _id: expense.category_id,
        });
        expect(category.name).toBe("Personal Care");
      });
    });
  });
});

