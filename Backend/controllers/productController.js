import Product from "../models/Product.js";

export const createProduct = async() => {
    try {
        const { name, description, price, stock, brand, category, colors, sizes, specifications} = req.body;
        
        if(!req.files || req.file.length < 4){
            return res.status(400).json({
                success:false,
                message:"Atleast 4 images required"
            })
        }

        const images = req.files.map((file) => ({
            public_id: file.filename,
            url: file.path
        }))

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            brand,
            category,
            images,
            colors: JSON.parse(colors), // coming as string
            sizes: JSON.parse(sizes),
            specifications: JSON.parse(specifications),
            createdBy: req.user._id,
        })

        res.status(201).json({
            success:true,
            message:"Product created successfully",
            product,
        })
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message: "Product creation failed" 
        });
    }
}