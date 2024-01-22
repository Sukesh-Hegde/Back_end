import UserModel from "../src/features/user/user.model.js";

const basicAuthorizer = (req,res,next)=>{
    //Check if authorization hader is empty.

    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(401).send("No authorization details found")
    }
    console.log(authHeader); //o/p Basic YWRtaW5AZWNvbS5jb206cGFzc3dvcmQx

    //if credential is present , Extract credential
    //credential which is send from client to server is encoded with base64

    const base64Credentials = authHeader.replace('Basic',''); 
    console.log(base64Credentials); // o/p=YWRtaW5AZWNvbS5jb206cGFzc3dvcmQx

    //decode the credential
    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8');
    console.log(decodedCreds);  //[username:password]
    const creds = decodedCreds.split(':'); // it will create the array, o/p=admin@ecom.com:password1

    //
    const user = UserModel.getAll().find((u)=> u.email==creds[0] && u.password==creds[1]);

    if(user){
        next();
    }else{
        return res.status(401).send("Incorrect Credential")
    }

}

export default basicAuthorizer