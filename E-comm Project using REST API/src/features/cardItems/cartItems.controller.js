import CartItemModel from "./cartItems.model.js"

export class CartItemController{
    add(req,res){
        const {productID, quantity} = req.query;
        const userID = req.userID; //taking the userID from the token
        CartItemModel.add(productID, userID, quantity)
        res.status(201).send("Cart is updated");
    }

    get(req,res){
        const userID = req.userID;//taking the userID from the token
        const items = CartItemModel.get(userID)
        return res.status(200).send(items);
    }

    delete(req,res){
        const userID = req.userID;//taking the userID from the token
        const cartItemID = req.params.id;
        const error = CartItemModel.delete( cartItemID,userID)
        if(error){
            return res.status(404).send(error);
        }
        return res.status(200).send("Cart item is removed");
    }

    update(req,res){
        const userID = req.userID;//taking the userID from the token
        const cartItemID = req.params.id;
        const quantity = req.query;
        const error = CartItemModel.update( cartItemID,userID,quantity)
        if(error){
            return res.status(404).send(error);
        }
        return res.status(200).send("quantity item is updated");
    }
}