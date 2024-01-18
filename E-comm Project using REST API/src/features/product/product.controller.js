import ProductModel from "./product.model.js";
// static funtions are called directly by class name so we dont neet to add any instances

export default class ProductController{
    getAllProducts(req,res){
        const products = ProductModel.GetAll();
        res.status(200).send(products)

    }

    addProduct(req,res){

    }

    rateProduct(req,res){

    }

    getOneProduct(req,res){
        
    }
}