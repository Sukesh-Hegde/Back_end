export const setLastVisit = (req, res, next)=>{
    //if cookie is set, then add a local variable with last visit time data.
    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    //if loging for the first time then set cookie, if not then update last visit
    res.cookie ('lastVisit',new Date().toISOString(),{
        //till how much it should save cookie, setting it for 2 days in milisecond, after 2 days this is going to expire
        maxAge:2*24*60*60*1000
    })
    
    next();
}