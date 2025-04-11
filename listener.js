
const fastify = require('fastify')({
  logger: true
})
fastify.register(require("./db/connection"))

fastify.register(require("./app"))


fastify.listen({ port: 9090 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})
