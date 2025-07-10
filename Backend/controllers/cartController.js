import Cart from "../models/Cart.js"
import Product from "../models/Product.js";

export const addToCart = async(req, res) => {
    try {
        const {productId, quantity, size, color} = req.body;

        if(!productId || !quantity){
            return res.status(404).json({
                success:false,
                message:"ProductId and Quantity is required!"
            })
        }

        //Check is product exist
        const existProduct = await Product.findById(productId);
        if(!existProduct){
            return res.status(404).json({
                success:false,
                message:"Product Not found!"
            })
        }

        //check is product already exist in cart
        const existCartItem = await Cart.findOne({
            user: req.user._id,
            product: productId,
            color,
            size
        })
        //if product exist then increase quantity by 1
        if(existCartItem){
            existCartItem.quantity += quantity;
            await existCartItem.save();
            return res.status(200).json({ success: true, message: "Quantity updated", cartItem: existCartItem });
        }

        //otherwise add product to cart
        const cartItem = await Cart.create({
            user: req.user._id,
            product: productId,
            quantity,
            color,
            size
        })

        res.status(201).json({
            success:true,
            message:"Item added to cart",
            cartItem
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}

export const getUserCart = async(req, res) => {
    try {
        const cartItem = await Cart.find({user: req.user._id})
        .populate("product", "name price images brand category stock")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            cartItem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Failed to fetch cart"
        });
    }
}

export const updateCart = async(req, res) => {
    try {
        const {id} = req.params;
        const {quantity} = req.body;

        console.log("Quantity", quantity)

        if(quantity < 1){
            return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
        }

        //find cartItem in Db
        const cartItem = await Cart.findOne({
            _id: id,
            user: req.user._id,
        })
        if(!cartItem){
            return res.status(404).json({
                success:false,
                message:'Cart Item not found'
            })
        }

        cartItem.quantity = quantity;
        await cartItem.save()

        res.status(200).json({
            success:true,
            message:'Cart Updated',
            cartItem
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to update cart item"
        })
    }
}

export const removeCartItem = async(req, res) => {
    try {
        const {id} = req.params;

        const cartItem = await Cart.findOneAndDelete({
            _id: id,
            user: req.user._id
        });

        if(!cartItem){
            return res.status(500).json({
                success:false,
                message:"Cart item not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Item remove from cart",
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to remove item from cart"
        })
    }
}