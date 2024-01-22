// Please don't change the pre-written code
// Import the necessary modules here

import { addUser, confirmLogin } from "../model/user.model.js";

export const registerUser = (req, res, next) => {
  const userData = req.body;
  if (userData) {
    let user = addUser(userData);
    res.status(201).json({ status: "success", user });
  } else {
    res.status(400).json({ status: "failure", msg: "invalid user details" });
  }
};

export const loginUser = (req, res) => {
  let status = confirmLogin(req.body);
  if (status) {
     
  } else {
    res.status(400).json({ status: "failure", msg: "invalid user details" });
  }
};






// import { addUser, confirmLogin, getAllUsers } from "../model/user.model.js";

// export const registerUser = (req, res, next) => {
//   // Write your code here
//   const {name, email, password} = req.body;
//   const newUser = {
//     name,email,password
//   }
//   const User = addUser(newUser);
//   res.json({ success: true, User });
// };

// export const loginUser = (req, res) => {
//   // Write your code here


// };
