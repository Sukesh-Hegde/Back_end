// Please don't change the pre-written code
// Import the necessary modules here
// import userModel from '../models/users.model.js'
import { userModel } from "../models/users.model.js";

export const userController = async (req, res) => {
  // Write your code here
  let usersData = await userModel();
    res.render("index.ejs",{users:usersData})
};
