const fastify = require("fastify");
const connectDatabase = require("../db/connection"); 

describe("MongoDB connection", () => {
  let app;

  beforeAll(async () => {
    app = fastify();
    await connectDatabase(app);
  });

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