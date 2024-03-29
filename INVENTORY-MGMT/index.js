import express from 'express'

//importing user
import UserController from './src/controllers/user.controller.js';

//importing controller
import ProductController from './src/controllers/product.controller.js';
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'

//importing validation middlware
import validationMiddleware from './src/middleware/validation.middleware.js'
import { uploadFile } from './src/middleware/file-upload.middleware.js';
//importing authentication
import { auth } from './src/middleware/auth.middleware.js';


const app = express();

//main.js file can be directly access to all "views" folder, so making it as public (for delete operation)
app.use(express.static('public'));

//importing cookieParser
import cookieParser from 'cookie-parser';
//import last visit middleware
import { setLastVisit } from './src/middleware/lastVisit.middleware.js';
app.use(cookieParser());
//setting cookie for every operation
app.use(setLastVisit);

//importing session
import session from 'express-session';
import { markAsUntransferable } from 'worker_threads';
app.use(session({
  secret:'SecretKey',
  resave:false,
  saveUninitialized:true,
  cookie: { secure:false},
}))

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
const productController = new ProductController();
//similarly for user.model
const userController = new UserController();


//calling server
app.get('/register',userController.getRegister)
app.get('/login',userController.getLogin)
app.post('/login',userController.postLogin)
app.get('/logout',userController.logout)
app.post('/register',userController.postRegister)
app.get("/",auth, productController.getProducts);
app.get('/add-product',auth,productController.getAddProduct)

//to get the view for update the product,
app.get(
    '/update-product/:id',
    auth,productController.getUpdateProductView
);

app.post(
  '/delete-product/:id',auth,
  productController.deleteProduct
);

//updating the data
app.post('/update-product',uploadFile.single('imageUrl'),auth,validationMiddleware,productController.postUpdateProduct)

//post request for when form is submitting
app.post('/',uploadFile.single('imageUrl'),auth,validationMiddleware,productController.postAddProduct)



app.use(express.static('src/views'))

app.listen(3400);
console.log('server is listening on port 3400');