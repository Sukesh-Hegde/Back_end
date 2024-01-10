import express from 'express'

//importing controller
import ProductController from './src/controllers/product.controller.js';
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'

const server = express();

//inform our server that we are using view engine
//setup view enhine settings
server.set("view engine","ejs");
//need to inform the path
server.set("views", path.join(path.resolve(),'src','views'))

//inform our server that we are using layout
//use it as middleware
server.use(ejsLayouts);

//we should call the method(getProduct) which belogs to class
//create an instance of productController (without instance we cannot call the method)
const productController = new ProductController()
server.get("/", productController.getProducts);

server.use(express.static('src/views'))

server.listen(3400);
console.log('server is listening on port 3400');