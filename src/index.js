import  express  from "express";
const server= express()

const port= 3001

server.use("/api", apiRouter);

// creo endpoint TEST

// server.get("/test", (req, res)=>{
//     res.json({message:"Hello, world! "})
// })

server.listen(port,()=>{
    console.log("Server is listening on port....: " + port )
})