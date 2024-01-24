// Please don't change the pre-written code
// Import the necessary modules here
import { getAllUsers } from "../../user/model/user.model.js";

let id = 3;
const products = [
  { id: 1, name: "iphone", price: 100000 },
  { id: 2, name: "oneplus", price: 50000 },
  { id: 3, name: "samsung", price: 60000 },
];

export const fetchAllProducts = () => {
  return products;
};

export const rateProductModel = (productId, userId, rating) => {
  // Write your code here
    // 1. Validate user and product
    const user = getAllUsers().find(
      (u) => u.id == userId
    );
    if(!user){
      return "user not found";
    }

    // Validate Product
    const product = products.find(
      (p) => p.id == productId);
      if(!product){
        return "product not found";
      }

      // 2. Check if there are any ratings and if not then add ratings array.
      
      if(!product.ratings){
        product.ratings = [];
        product.ratings.push({
          userId:userId, 
          rating: rating
        });
      }
      else{
        // 3. Check if user rating is already available.
        const existingRatingIndex = product.ratings.findIndex(
          (r) => r.userId == userId
        );

        
        if(existingRatingIndex >= 0){
          product.ratings[existingRatingIndex] = {
            userId:userId, 
            rating: rating,
          };
        }
        else{
          // 4. if no exisitng rating, then add new rating.
          product.ratings.push({
            userID:userId, 
            rating: rating
          });
        
        }

        
      }
      return product;
  
};
