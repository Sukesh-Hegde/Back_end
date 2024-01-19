import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
    //callback takes is there any errors and destination of the file
    cb(null,'./uploads/');
},
//how the filename should be
filename: (req, file, cb) =>
{
    cb(null,new Date().toISOString()+ file.originalname);    
}});

// creating multer instance and specifying where its storage configuration is
//more details:  https://www.npmjs.com/package/multer
export const upload= multer({
    storage: storage,
})