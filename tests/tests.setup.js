const fastify = require("fastify");
const {dbConnection} = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test_data/index");
const appPlugin = require("../app");

let app;

beforeAll(async () => {
  app = fastify();
  await dbConnection(app);
  await app.register(appPlugin);
  await app.ready();
});

beforeEach(async () => {
  await seed(testData);
});

afterAll(async () => {
  if (app.mongo?.client) {
    await app.mongo.client.close();
  }
  await app.close();
});

module.exports = () => app;

