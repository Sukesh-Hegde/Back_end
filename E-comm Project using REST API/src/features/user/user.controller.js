import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';

export default class UserController {

    signUP(req, res){
        //read all the details
        const {name,email,password,type} =req.body;
        const user = UserModel.singnUp(name,email,password,type);
        res.status(201).send(user);

    }

      signIn(req, res){
        const result = UserModel.singnIn(req.body.email, req.body.password);
        if (!result) {
            return res.status(400).send('Incorrect Credential');
        }else{
            //1 create token
            const token = jwt.sign({userId: result.id, email: result.email},'0n1QFQXWEYZ0Kfy1L1NTKyjYOH03NWBV',
            {expiresIn: '1h',});
            //2 send token


            return res.status(200).send(token)
        }
    }
}