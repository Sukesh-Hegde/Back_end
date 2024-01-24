// Please don't change the pre-written code
// Import the necessary modules here

let cartId = 0;
export class cartModel {
  constructor(userId, productId, quantity) {
    this.id = ++cartId;
    this.userId = userId;
    this.productId = productId;
    this.quantity = Number(quantity);
  }
}
const cartItems = [new cartModel(1, 2, 5), new cartModel(3, 3, 10)];

export const addToCart = (userId, productId, quantity) => {
  // Write your code here
    const cartItem = new cartModel(
    userId,
    productId, 
    quantity
    );
    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
    return cartItems;
  
};

// export const removeFromCart = (userId, cartItemId) => {
//   // Write your code here
//   const cartItemIndex = cartItems.findIndex(
//     (i)=> i.id == cartItemId && i.userId == userId);
//     if(cartItemIndex == -1){
//       return 'Item not found';
//     }else{
//       cartItems.splice(cartItemIndex,1)
//     }
// };
export const removeFromCart = (userId, cartItemId) => {
  let cartItemInd = cartItems.findIndex((item) => {
    return item.id == cartItemId && item.userId == userId;
  });
  if (cartItemInd >= 0) {
    let itemToDelete = cartItems[cartItemInd];
    cartItems.splice(cartItemInd, 1);
    return { success: true, deletedCartItem: itemToDelete };
  } else {
    return {
      success: false,
      msg: "operation not allowed",
    };
  }
};

export const fetchdetails = (userID,cartItemID,quantity)=>{
  const item = cartItems.find(
    (i)=>i.userId == userID && i.id == cartItemID && i.quantity == quantity
  );
  return item;
}