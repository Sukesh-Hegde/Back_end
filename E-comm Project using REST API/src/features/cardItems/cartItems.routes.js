// To manage routes/paths to cartItemController

//1. Import express.
import express from 'express';

import { CartItemController } from './cartItems.controller.js';

//2. Initialise express router.
const CartRouter= express.Router();

const cartController = new CartItemController
CartRouter.post("/:id",cartController.update);
CartRouter.delete("/:id",cartController.delete);
CartRouter.post("/",cartController.add);
CartRouter.get("/",cartController.get);

export default CartRouter;