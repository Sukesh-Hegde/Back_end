//middleware
//to avoid voilation of single responsible principle we used middleware
//also it will make code  as loose coupled

// ************************************************

// const validateRequest = (req,res,next)=>{
//     // validate data
//     const { name, price, imageUrl } = req.body;
//     let errors = [];
//     if (!name || name.trim() == '') {
//       errors.push('Name is required');
//     }
//     if (!price || parseFloat(price) < 1) {
//       errors.push(
//         'Price must be a positive value'
//       );
//     }
//     try {
//       const validUrl = new URL(imageUrl);
//     } catch (err) {
//       errors.push('URL is invalid');
//     }

//     if (errors.length > 0) {
//       return res.render('new-product', {
//         errorMessage: errors[0],
//       });
//     }
//     // if there no error then it will call the next pipeline
//     next();
// };

// *****************************************************

// export default validateRequest;
//we exported here because
//export default expect 3things
//1HoistedDeclaration=> a function
//class
//assignment expression



// validating using express-validator

//importing body from express-validator
import {
  body,
  validationResult,
} from 'express-validator';

const validateRequest = async (
  req,
  res,
  next) => {
  console.log(req.body);
  // 1. Setup rules for validation.
  const rules = [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),
    body('price')
    //gt=> grater than 0
    .isFloat({ gt: 0 })
      .withMessage(
        'Price should be a positive value'
      ),
    body('imageUrl')
      .isURL()
      .withMessage('Invalid url'),
  ];

  // 2. run those rules.
  //promise.all will take array of promises and exicute for all of them
  await Promise.all(
    rules.map((rule) => rule.run(req))
  );

  // 3. check if there are any errors after running the rules.
  var validationErrors = validationResult(req);
  // console.log(validationErrors);
  // 4. if errros, return the error message
  if (!validationErrors.isEmpty()) {
    return res.render('new-product', {
      //validationResult is an object so converting it to an array then printing the first arror (array()[0])
      errorMessage:
        validationErrors.array()[0].msg,
    });
  }
  next();
};

export default validateRequest;

