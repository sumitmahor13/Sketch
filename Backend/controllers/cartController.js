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

export const getUserCart = async (req, res) => {
    try {
        const cartItems = await Cart.find({ user: req.user._id })
            .populate("product", "name price images brand category stock")
            .sort({ createdAt: -1 });

        let cartDetails = [];
        let totalSubtotal = 0;

        console.log("CARTITEMS",cartItems)

        // Loop through each item to calculate subtotal
        for (const item of cartItems) {
            const product = item.product;
            const quantity = item.quantity;
            const size = item.size;
            const color = item.color;
            const price = product.price;
            const subtotal = price * quantity;

            totalSubtotal += subtotal;

            cartDetails.push({
                _id: item._id,
                product: {
                    _id: product._id,
                    name: product.name,
                    price: price,
                    size:size,
                    color:color,
                    images: product.images,
                    brand: product.brand,
                    category: product.category,
                    stock: product.stock,
                },
                quantity,
                subtotal,
            });
        }

        // Example shipping charge logic
        const shippingCharge = totalSubtotal > 2000 ? 0 : 200; // Free shipping over ₹2000

        // Dynamic discount logic based on subtotal percentage
        let discount = 0;
        let discountPercentage = 0;

        if (totalSubtotal > 10000) {
            discountPercentage = 15; // 15% off for orders above ₹10000
        } else if (totalSubtotal > 5000) {
            discountPercentage = 10; // 15% off for orders above ₹5000
        } else if (totalSubtotal > 2000) {
            discountPercentage = 5; // 10% off for orders above ₹2000
        } else if (totalSubtotal > 1000) {
            discountPercentage = 3; // 5% off for orders above ₹1000
        }

        discount = (totalSubtotal * discountPercentage) / 100;

        const finalAmount = totalSubtotal + shippingCharge - discount;

        res.status(200).json({
            success: true,
            cart: {
                items: cartDetails,
                subtotal: totalSubtotal,
                shippingCharge,
                discount,
                discountPercentage,
                finalAmount,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch cart",
        });
    }
};



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