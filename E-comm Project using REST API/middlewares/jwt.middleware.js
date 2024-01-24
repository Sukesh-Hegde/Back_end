import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next)=>{
    //1.read the token
    const token = req.headers['authorization'];
    //2.if no token, return the error
    if(!token){
        return res.status(401).send("Unauthorized")
    }
    //3. check if the token is valid
    try{
    const payload = jwt.verify(token,'0n1QFQXWEYZ0Kfy1L1NTKyjYOH03NWBV');
    //requesting userID  from payload.userID 
    req.userID = payload.userId //it will be used in cartItems.controller.js for the userID
    // console.log(payload);
    }catch(err){
        //4. return error
        return res.status(401).send("Unauthorized")
    }
    //5. call next middleware
    next();
}
export default jwtAuth