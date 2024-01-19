import express from 'express'
import productRouter from './src/features/product/product.routes.js';
//importing body-parser midleware
import bodyParser from 'body-parser';
const server = express();
server.use(bodyParser.json());

//for all requests related to product, redirect to product routes.
server.use("/api/products", productRouter)

server.get("/",(req,res)=>{
    res.send("welcome to Ecommerce APIs");
});

server.listen(3200, ()=>{
    console.log("Server is running as 3200");
});
