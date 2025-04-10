const dotenv = require("dotenv")
const fastify = require("fastify-mongodb")

const ENV = process.env.NODEENV || "dev"


.config({path: `${__dirname}/../.env.${ENV}`});

const {MONGODB_URI} = process.env
const connectDatabase = async (app) => {try{
    app.register(fastify), {url: MONGODB_URI}
    app.mongo.client.connect()
    console.log(`connected to ${MONGODB_URI}`)
} catch {

}
}

module.exports = connectDatabase