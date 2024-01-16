

export const auth = (req,res,next)=>{
    //if the session of email is available in the coockiy then no need of login
    if(req.session.userEmail){
        next();
    }else{
        res.redirect('/login')
    }

}