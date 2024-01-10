  
import path from 'path'
// import products from product.model.js
import ProductModel from '../models/product.model.js'


export default class ProductController{

    getProducts(req,res){
        let products = ProductModel.get();
        console.log(products);
        res.render("products.ejs",{products:products})

        // return res.sendFile(
        // path.join(path.resolve(),'src','views','products.html'),)
    }
}