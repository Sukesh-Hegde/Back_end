//middleware
//to avoid voilation of single responsible principle we used middleware
//also it will make code  as loose coupled

const validateRequest = (req,res,next)=>{
    // validate data
    const { name, price, imageUrl } = req.body;
    let errors = [];
    if (!name || name.trim() == '') {
      errors.push('Name is required');
    }
    if (!price || parseFloat(price) < 1) {
      errors.push(
        'Price must be a positive value'
      );
    }
    try {
      const validUrl = new URL(imageUrl);
    } catch (err) {
      errors.push('URL is invalid');
    }

    if (errors.length > 0) {
      return res.render('new-product', {
        errorMessage: errors[0],
      });
    }
    // if there no error then it will call the next pipeline
    next();
};

export default validateRequest;
//we exported here because
//export default expect 3things
//1HoistedDeclaration=> a function
//class
//assignment expression