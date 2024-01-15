// Please don't change the pre-written code
// Import the necessary modules here

import ProductModel from "../models/ProductModel.js";

const productModel = new ProductModel();
export default class productController {
  index = (req, res) => {
    res.render("index", { products: productModel.getAllProducts() });
  };

  search = (req, res) => {
    // Write your code here
    const searchTerm = req.body.name;
    // console.log(searchTerm);
    const products =  productModel.searchResult(searchTerm);
    // Rendering
    res.render('searchResults', { products });
  };
}
