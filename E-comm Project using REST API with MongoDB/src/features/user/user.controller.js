import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';

export default class UserController {

  constructor(){
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;

    //creating hashing of password
    const hashPassword = await bcrypt.hash(password,12)

    const user = new UserModel(
      name,
      email,
      hashPassword, // passing hashPassword instead of password
      type
    );
    await this.userRepository.signUp(user);
    res.status(201).send(user);
  }

  async signIn(req, res, next) {
    try{
      //1.find user by email
      //check user is there by checking the email
      const user = await this.userRepository.findByEmail(req.body.email);
      if(!user){
        return res
        .status(400)
        .send('Incorrect Credentials');
      }else{
        //2.compare password with hashed password
       const result = await bcrypt.compare(req.body.password, user.password);
      if(result){
        // 3. Create token.
      const token = jwt.sign(
        {
          userID: result.id,
          email: result.email,
        },
        process.env.JWT_SECRET, //from .env file
        {
          expiresIn: '1h',
        }
      );

      // 4. Send token.
      return res.status(200).send(token);
    }else {
  return res
  .status(400)
  .send('Incorrect Credentials');
    }   
  }} catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
}




