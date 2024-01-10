import express from "express";
import ProductController from "./src/controllers/product.controller.js";

const productController = new ProductController();
const app = express();

app.get("/", productController.getProducts);

// server.use(express.static('src/assets'))

export default app;
