import UserModel from "./user.model.js";

export default class UserController {

    signUP(req, res){
        //read all the details
        const {name,email,password,type} =req.body;
        const user = UserModel.SingnUp(name,email,password,type);
        res.status(201).send(user);

    }

    signIn(req, res){
        const result = UserModel.SingnIn(req.body.email, req.body.password);
        if (!result) {
            return res.status(400).send('Incorrect Credential');
        }else{
            return res.status(201).send('Login Successful')
        }
    }
}