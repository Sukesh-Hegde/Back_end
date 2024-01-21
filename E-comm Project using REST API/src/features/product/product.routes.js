// To manage routes/paths to ProductController

//importing fileupload middleware
import {upload} from '../../../middlewares/fileUpload.middleware.js';

//1. Import express.
import express from 'express';

import ProductController from './product.controller.js';

//2. Initialise express router.
const productRouter = express.Router();

const productController = new ProductController

//All the paths to controller methods.
//localhost/api/products

productRouter.get("/",productController.getAllProducts);
productRouter.post("/",upload.single('imageUrl'), productController.addProduct);
productRouter.get("/filter",productController.filterProducts);
productRouter.get("/:id", productController.getOneProduct);
//using query parameter
//localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Category1



export default productRouter;

