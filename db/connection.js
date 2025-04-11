const dotenv = require("dotenv");
const fastifyPlugin = require("fastify-plugin")

const ENV = process.env.NODE_ENV || "development";

dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

const uri = process.env.MONGODB_URI;

async function connectDatabase(fastify, options) {
  try {
    console.log("Registering MongoDB plugin...");
    await fastify.register(require('@fastify/mongodb'), { url: uri });
    console.log(`Connected to MongoDB at ${uri}`);
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error.message);
  }

}

module.exports = fastifyPlugin(connectDatabase);
