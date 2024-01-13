  
import path from 'path'
// import products from product.model.js
import ProductModel from '../models/product.model.js'


export default class ProductController{

    getProducts(req,res,next){
        let products = ProductModel.get();
        // console.log(products);
        //sending the product from server to client
        res.render("index.ejs",{products:products})

        // return res.sendFile(
        // path.join(path.resolve(),'src','views','products.html'),)
    }

    //request to get the form
    getAddProduct(req,res,next){
        return res.render('new-product.ejs',{errorMessage:null});
    }

    //adding new product
    postAddProduct(req,res,next){
        //access data from form
        // console.log(req.body);
        //passing new product to add method of model,  after converting to readable form in index.js
        ProductModel.add(req.body);

        //retuerning to main page after updating the new product
        let products = ProductModel.get();
        res.render("index.ejs",{products:products})

    }

    getUpdateProductView(req,res,next){
        //1. if product exists then return view

        //from body requesting for id
        const {id}=req.body;
        const productFound = ProductModel.getById(id);
        if (productFound){
            //if product is found return with product and error message as null
            res.render('update-product', {product:productFound, errorMessage:null});
        }
        //2.else return error
        else{
            res.status(401).send('product not found')
        }
    }
       
}