import multer from 'multer';

const storageConfig = multer.diskStorage({destination: (req,file,cb) =>{
    //callback takes is there any errors and destination of the file
    cb(null,'public/images');
},
//how the filename should be
filename: (req, file, cb) =>
{
    const name =Date.now() + '-' + file.originalname;
    cb(null,name);    
}});

// creating multer instance and specifying where its storage configuration is
//more details:  https://www.npmjs.com/package/multer
export const uploadFile = multer({
    storage: storageConfig,
})