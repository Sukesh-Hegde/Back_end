// Please don't change the pre-written code
// Import the necessary modules here


export const formValidationMiddleware = (req, res, next) => {
  // it will request the body, means here we are giving the input using postman
  const {name,mobile} =req.body;
  // if (!name || !mobile){
  //   return res.status(400).json({error:'All fields are required'})
  // }
  next()
};
