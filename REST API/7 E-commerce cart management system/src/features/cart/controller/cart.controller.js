// Please don't change the pre-written code
// Import the necessary modules here
import { addToCart,removeFromCart,fetchdetails } from "../model/cart.model.js";

export const addToCartController = (req, res) => {
  // Write your code here
  const {productId, quantity} = req.query;
    const userID = req.userId; //taking the userID from the token
    const  items = addToCart(userID,productId, quantity)
    res.status(200).json({ success: true, item:items });
};

export const removeFromCartController = (req, res) => {
  const userId = req.userId;
  const itemId = req.params.itemId;
  const resp = removeFromCart(userId, itemId);
  if (resp.success) {
    return res.status(200).json(resp);
  } else {
    return res.status(400).json(resp);
  }
};


// export const removeFromCartController = (req, res) => {
//   // Write your code here
//   const userID = req.userId;//taking the userID from the token
//         const cartItemID = req.params.itemId;
//         const quantity= req.query;
//         console.log(userID);
//         console.log(cartItemID);
//         console.log(quantity);
//         const datails = fetchdetails(userID,cartItemID,quantity);
//         const error = removeFromCart( userID,cartItemID)
//         if(error){
//             return res.status(404).json({ success: false, msg:"operation not allowed" })
//         }
//         return res.status(200).json({ success: true, deletedCartItem: datails})
      
// };
