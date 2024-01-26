import express from 'express'
import swagger from 'swagger-ui-express';//importing swagger
import cors from 'cors'; 
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
// import basicAuthorizer from './middlewares/basicAuth.middleware.js'; //importing authorizer
import jwtAuth from './middlewares/jwt.middleware.js'; //importing authorizer
//importing body-parser midleware
import bodyParser from 'body-parser';
import CartRouter from './src/features/cardItems/cartItems.routes.js';
import apiDocs from './swagger.json' assert{type:'json'};//assert= informing this is the json object
import loggerMiddleware from './middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
const server = express();
server.use(bodyParser.json());

// CORS policy configuration
var corsOptions = {
    origin: "http://localhost:51370"
}
server.use(cors(corsOptions));

//swagger
server.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

//L ogger midleware
server.use(loggerMiddleware);

//for all requests related to product, redirect to product routes.
server.use("/api/products",jwtAuth,productRouter);

//for all requests related to user, redirect to user routes.
server.use("/api/users", userRouter);

//for all requests related to user, redirect to user routes.
server.use("/api/cartItems",jwtAuth, CartRouter);

//Error handler middleware
server.use((err,req,res,next) => {
    console.log(err);
if (err instanceof ApplicationError){
    res.status(err.code).send(err.message);
}
    res.status(500).send('Somthing went wrong, please try later');// 500 is server error
});

server.get("/",(req,res)=>{
    res.send("welcome to Ecommerce APIs");
});

//Middleware to handle 404 requests.
server.use((req,res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at http://localhost:3200/api-docs")
})

server.listen(3200, ()=>{
    console.log("Server is running as 3200");
});
