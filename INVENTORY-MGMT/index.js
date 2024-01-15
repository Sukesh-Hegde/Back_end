import express from 'express'

//importing controller
import ProductController from './src/controllers/product.controller.js';
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
//importing validation middlware
import validationMiddleware from './src/middleware/validation.middleware.js'
import { uploadFile } from './src/middleware/file-upload.middleware.js';

const app = express();

//main.js file can be directly access to all "views" folder, so making it as public (for delete operation)
app.use(express.static('public'));

//parse form data
//When the new product is added it must be converted to readable formate, this is done by the express MIDDLEWARE
app.use(express.urlencoded({extended: true}))



//inform our server that we are using view engine
//setup view enhine settings
app.set("view engine","ejs");
//need to inform the path
app.set("views", path.join(path.resolve(),'src','views'))

//inform our server that we are using layout
//use it as middleware
app.use(ejsLayouts);

//we should call the method(getProduct) which belogs to class
//create an instance of productController (without instance we cannot call the method)
const productController = new ProductController()
//calling server
app.get("/", productController.getProducts);
app.get('/add-product',productController.getAddProduct)

//to get the view for update the product,
app.get(
    '/update-product/:id',
    productController.getUpdateProductView
);

app.post(
  '/delete-product/:id',
  productController.deleteProduct
);

//updating the data
app.post('/update-product',uploadFile.single('imageUrl'),validationMiddleware,productController.postUpdateProduct)

//post request for when form is submitting
app.post('/',uploadFile.single('imageUrl'),validationMiddleware,productController.postAddProduct)



app.use(express.static('src/views'))

app.listen(3400);
console.log('server is listening on port 3400');