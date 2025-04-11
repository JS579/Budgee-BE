const fastify = require("fastify");
const connectDatabase = require("../db/connection");
const seed = require("../db/seeds/seed") 
const testData = require("../db/data/test_data/index")

describe("MongoDB connection", () => {
  let app;

  beforeAll(async () => {
    app = fastify();
    await connectDatabase(app);
  });

  beforeEach(async () =>
    seed(testData)
)

       afterAll(async () => {
    await app.mongo.client.close();
    await app.close();
  });
  describe("checking connection",()=>{
 test("should connect to MongoDB", () => {
expect(app.mongo).toBeDefined();
    expect(app.mongo.client).toBeDefined();
  });
});
test("MongoDb sample input should return as expected",()=>{

})
})