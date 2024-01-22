// Please don't change the pre-written code
// Import the necessary modules here
import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
  // Write your code here

  console.log(req.cookies,"cookie");
  const {jwtToken} = req.cookies
 
  try{
  const payload = jwt.verify(jwtToken,'0n1QFQXWEYZ0Kfy1L1NTKyjYOH03NWBV');
  next();
  }catch(error){
      //4. return error
      return res.status(401).send({ success: false, msg: error } );
  }
  //5. call next middleware
  
};

export default jwtAuth;
