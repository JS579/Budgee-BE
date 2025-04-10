const connectDatabase = require("./db/connection")
const Fastify = require('fastify')


/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})
fastify.register(connectDatabase)


fastify.listen({ port: 9090 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})