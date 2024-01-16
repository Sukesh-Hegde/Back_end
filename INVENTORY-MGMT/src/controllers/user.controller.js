import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

class UserController{
    getRegister(req,res){
        res.render('register');
    }

    getLogin(req,res){
        res.render('login', {errorMessage: null});
    }

    postRegister(req,res) {
        //extract the values using objest de-structuring
        const {name, email, password} = req.body;
        // const imageUrl = "images/" + req.file.filename;
        UserModel.add(name, email, password);
        res.render('login', {errorMessage: null});
    }

    postLogin(req,res) {
        //extract the values using objest de-structuring
        const { email, password} = req.body;
        const user = UserModel.isValidUser( email, password);
        if(!user){
            return res.render('login',{
                errorMessage: 'Invalid Credentials'
            });
        }
        //attaching req object to session object
        //this will store email id in the coockies when the egistered email and password matches with login email and pass
        req.session.userEmail = email;

        var products = ProductModel.getAll();
        res.render("index",{products:products})
    }

}

export default UserController