  
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
        return res.render('new-product.ejs',{errorMessage:null});
    }

    //adding new product
    addNewProduct(req,res){
        //access data from form
        // console.log(req.body);
        //passing new product to add method of model,  after cinvorting to readable form in index.js
        ProductModel.add(req.body);

        //retuerning to main page after updating the new product
        let products = ProductModel.get();
        res.render("products.ejs",{products:products})

    }
}