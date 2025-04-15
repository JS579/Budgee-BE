const root = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
      return { root: true }
    })
  }

module.exports = root