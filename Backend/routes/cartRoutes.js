import express from "express"
import {isUser} from "../middlewares/isUser.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { addToCart, getUserCart, removeCartItem, updateCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", isAuthenticated, isUser, addToCart);
router.get("/", isAuthenticated, isUser, getUserCart);
router.put("/update/:id", isAuthenticated, isUser, updateCart);
router.delete("/delete/:id", isAuthenticated, isUser, removeCartItem);

export default router;