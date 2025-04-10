const connectDatabase = require("../db/connection")

// beforeAll(()=> {
//     return db
// })
// afterAll(()=>{db.end()})

describe("test", () =>{

    test("test", ()=>{
        console.log(connectDatabase())
        
    })

})