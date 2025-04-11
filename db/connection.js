const dotenv = require("dotenv");
// const path = require("path");
// const fastifyDB = require("@fastify/mongodb");
const fastifyPlugin = require("fastify-plugin")

const ENV = process.env.NODE_ENV || "development";

dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

const uri = process.env.MONGODB_URI;

async function connectDatabase(fastify, options) {

 fastify.register(require('@fastify/mongodb'), { url: uri });


}

module.exports = fastifyPlugin(connectDatabase);
