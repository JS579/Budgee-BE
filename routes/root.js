const endpoints = require("../endpoints.json");

const root = async function (fastify, opts) {
  fastify.get("/api", async function (request, reply) {
    return {endpoints};
  });

  fastify.get("/", async function (request, reply) {
    return {endpoints};
  });
};

module.exports = root;
