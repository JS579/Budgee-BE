const dotenv = require("dotenv")
const {MongoClient} = require("mongodb")
const fastifyDB = require("fastify-mongodb")
const fastifyPlugin = require("fastify-plugin")
const path = require("path")


const ENV = process.env.NODE_ENV || "development"


dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

const uri = process.env.MONGODB_URI



// const client = new MongoClient(uri)
// let db



async function connectDatabase(app) {try{

    app.register(fastifyDB, {url: uri})
    await app.mongo.client.connect();
    console.log(`connected to ${uri}`)
} catch (error){
    console.log("connection error")
}

//    await client.connect().then(()=>{

//         db = client.db()
//         console.log(`Connected to ${uri}`)
//     })

// } catch (error){
//     console.log(error)
//     console.log("failed to connect")
// } 
}

// connectDatabase()

module.exports = connectDatabase