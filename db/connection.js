const dotenv = require("dotenv");
const path = require("path");
const fastifyDB = require("@fastify/mongodb");
const fastifyPlugin = require("fastify-plugin")

const ENV = process.env.NODE_ENV || "development";

dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

const uri = process.env.MONGODB_URI;

async function connectDatabase(app) {
  try {
    console.log("Registering MongoDB plugin...");
    await app.register(fastifyDB, { url: uri });
    console.log(`Connected to MongoDB at ${uri}`);
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error.message);
  }
}

module.exports = fastifyPlugin(connectDatabase);
