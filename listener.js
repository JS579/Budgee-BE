const connectDatabase = require("./db/connection")
const Fastify = require('fastify')
const routes = require("./app")



// /**
//  * @type {import('fastify').FastifyInstance} Instance of Fastify
//  */
const fastify = Fastify({
  logger: true
})
// fastify.register(require("./db/connection"))
// fastify.register(require("./app"))
console.log(fastify)

fastify.register(connectDatabase()).then(()=>{
fastify.listen({ port: 9090 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})
})