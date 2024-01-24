import express from 'express'
import swagger from 'swagger-ui-express';//importing swagger
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
// import basicAuthorizer from './middlewares/basicAuth.middleware.js'; //importing authorizer
import jwtAuth from './middlewares/jwt.middleware.js'; //importing authorizer
//importing body-parser midleware
import bodyParser from 'body-parser';
import CartRouter from './src/features/cardItems/cartItems.routes.js';
import apiDocs from './swagger.json' assert{type:'json'};//assert= informing this is the json object
const server = express();
server.use(bodyParser.json());

//swagger
server.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

//for all requests related to product, redirect to product routes.
server.use("/api/products",jwtAuth,productRouter);

//for all requests related to user, redirect to user routes.
server.use("/api/users", userRouter);

//for all requests related to user, redirect to user routes.
server.use("/api/cartItems",jwtAuth, CartRouter);

server.get("/",(req,res)=>{
    res.send("welcome to Ecommerce APIs");
});

server.listen(3200, ()=>{
    console.log("Server is running as 3200");
});
