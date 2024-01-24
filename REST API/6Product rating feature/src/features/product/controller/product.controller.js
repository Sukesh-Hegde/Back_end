// Please don't change the pre-written code
// Import the necessary modules here
// Write your code here
import { fetchAllProducts,rateProductModel } from "../model/product.model.js";

export const getAllProducts = (req, res, next) => {
  const products = fetchAllProducts();
  res.json({ success: true, products });
};
export const getOneProduct = (req, res, next) => {
  res.json({ success: true, msg: "getOneProduct working" });
};
export const addProduct = (req, res, next) => {
  res.json({ success: true, msg: "addProduct working" });
};
export const rateProduct = (req, res, next) => {
  // Write your code here
  const productId = req.query.productId
  const userId = req.query.userId
  const rating = req.query.rating
  if (rating>5 || rating<0){
    res.status(401).json({ success: false, msg:"rating should be b/w 0 and 5" });
  }

    const product = rateProductModel(
      productId,
      userId,
      rating
      );
      if(product=="user not found" ){
        return res.status(401).json({ success: false, msg:"user not found" });
      }
      if(product=="product not found" ){
        return res.status(401).json({ success: false, msg:"product not found" });
      }
      
      res.status(200).json({ success: true, msg: product });

};
