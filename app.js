

async function routes (fastify, options) {
    const collection = fastify.mongo.db.collection('test_collection')
  
    fastify.get('/', async (request, reply) => {
      return { hello: 'world' }
    })

    fastify.get('/test', async (request, reply) => {
        return { test: "👍" }
      })
}

module.exports = routes