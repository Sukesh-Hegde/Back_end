// To manage routes/paths to userController

//1. Import express.
import express from 'express';

import UserController from './user.controller.js';

//2. Initialise express router.
const userRouter = express.Router();

const userController = new UserController();

//All the paths to controller methods.
//localhost/api/products
userRouter.post("/signup",userController.signUP);
userRouter.post("/signin",userController.signIn);

export default userRouter;

