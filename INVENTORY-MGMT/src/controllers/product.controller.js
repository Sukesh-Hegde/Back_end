  
// import products from product.model.js
import ProductModel from '../models/product.model.js'


class ProductController{

    getProducts(req,res,next){
        var products = ProductModel.getAll();
        // console.log(products);
        //sending the product from server to client
        res.render("index",{products:products})

        // return res.sendFile(
        // path.join(path.resolve(),'src','views','products.html'),)
    }

    //request to get the form
    getAddProduct(req,res,next){
        res.render('new-product',{errorMessage:null});
    }

    //adding new product
    postAddProduct(req,res,next){
        //access data from form
        // console.log(req.body);
        //passing new product to add method of model,  after converting to readable form in index.js
        const {name, desc, price} = req.body;
        const imageUrl = "images/" + req.file.filename;

        ProductModel.add(name, desc, price, imageUrl);

        //retuerning to main page after updating the new product
        var products = ProductModel.getAll();
        res.render("index",{products:products})

    }

    getUpdateProductView(req, res, next) {
        // 1. if product exists then return view
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if (productFound) {
          res.render('update-product', {
            product: productFound,
            errorMessage: null,
          });
        }
        // 2. else return errors.
        else {
          res.status(401).send('Product not found');
        }
    }

    postUpdateProduct(req,res){
        ProductModel.update(req.body);
        var products = ProductModel.getAll();
        res.render("index",{products:products})
    }

    deleteProduct(req,res){
      const id = req.params.id;
      //if product doesnot exist then
      const productFound = ProductModel.getById(id);
        if (!productFound) {
          return res.status(401).send('Product not found');
          
        }
      ProductModel.delete(id);
      var products = ProductModel.getAll();
      res.render('index',{products});
      }   
       
}
export default ProductController;