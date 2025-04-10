const connectDatabase = require("./db/connection")
const fastify = require("fastify")

connectDatabase().then(()=>{
    fastify.listen(9090, (err, path)=>{
        if(err){
            console.error(err)
        } else {
            console.log(`server is listening at ${path}`)
        }
    })

})