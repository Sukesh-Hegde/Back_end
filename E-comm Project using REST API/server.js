import express from 'express'
import productRouter from './src/features/product/product.routes.js';
const server = express();

//for all requests related to product, redirect to product routes.
server.use("/api/products", productRouter)

server.get("/",(req,res)=>{
    res.send("welcome to Ecommerce APIs");
});

server.listen(3200, ()=>{
    console.log("Server is running as 3200");
});
