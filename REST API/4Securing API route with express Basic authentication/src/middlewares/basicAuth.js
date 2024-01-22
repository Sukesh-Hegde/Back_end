// Please don't change the pre-written code
// Import the necessary modules here
import { getAllUsers } from "../features/user/model/user.model.js";

const basicAuthMiddleware = (req,res,next) => {
  // Write your code here
  //Check if authorization hader is empty.
    const authHeader = req.headers["authorization"];

    if(!authHeader){
      return res.status(401).json({ status: "false", msg: "No authorization details found" });
    }

    //if credential is present , Extract credential
    //credential which is send from client to server is encoded with base64

    const base64Credentials = authHeader.replace('Basic',''); 
    console.log(base64Credentials); // o/p=YWRtaW5AZWNvbS5jb206cGFzc3dvcmQx

    //decode the credential
    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8');
    console.log(decodedCreds);  //[username:password]
    const creds = decodedCreds.split(':'); // it will create the array, o/p=admin@ecom.com:password1

    //
    const user = getAllUsers().find((u)=> u.email==creds[0] && u.password==creds[1]);

    if(user){
        next();
    }else{
      return res.json({ success: false, msg: "authorization failed" });
    }
};

export default basicAuthMiddleware;
