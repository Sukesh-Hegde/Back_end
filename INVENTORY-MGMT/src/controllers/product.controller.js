  
import path from 'path'
// import products from product.model.js
import ProductModel from '../models/product.model.js'


export default class ProductController{

    getProducts(req,res){
        let products = ProductModel.get();
        // console.log(products);
        //sending the product from server to client
        res.render("products.ejs",{products:products})

        // return res.sendFile(
        // path.join(path.resolve(),'src','views','products.html'),)
    }

    //request to get the form
    getAddForm(req,res){
        return res.render('new-product.ejs');
    }

    //adding new product
    addNewProduct(req,res){
        //access data from form
        console.log(req.body);
        let products = ProductModel.get();
        res.render("products.ejs",{products:products})

    }
}