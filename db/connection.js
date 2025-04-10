const dotenv = require("dotenv")
const {MongoClient} = require("mongodb")
const fastifyDB = require("fastify-mongodb")
const fastifyPlugin = require("fastify-plugin")
const path = require("path")


const ENV = process.env.NODE_ENV || "development"


dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

const uri = process.env.MONGODB_URI



const client = new MongoClient(uri)
let db

client.connect().then(()=>{
    db = client.db()
    console.log(`Connected to ${uri}`)

})



async function connectDatabase(fastify, options) {try{
   await fastify.register(fastifyDB, {url: uri})
    fastify.log(`connected to ${MONGODB_URI}`)
} catch (error){
    console.log(error)
    console.log("failed to connect")
}
}

module.exports = fastifyPlugin(connectDatabase) 