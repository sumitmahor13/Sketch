import Product from "../models/Product.js";
import cloudinary from "../config/cloundinary.js"

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, brand, category, colors, sizes, specifications} = req.body;

    // basic field check
    if (!name || !description || !price || !stock || !brand || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // image check
    if (!req.files || req.files.length < 4) {
      return res.status(400).json({
        success: false,
        message: "At least 4 images required",
      });
    }

    // cloudinary image list
    const images = req.files.map((file) => ({
      public_id: file.filename,
      url: file.path,
    }));

    // safe JSON parse
    const safeParse = (str) => {
      try {
        return JSON.parse(str);
      } catch (err) {
        return [];
      }
    };

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      brand,
      category,
      images,
      colors: safeParse(colors),
      sizes: safeParse(sizes).map(Number),
      specifications: safeParse(specifications),
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product creation failed",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { keyword, category, brand, minPrice, maxPrice, rating, sort, page = 1, limit = 10} = req.query;

    //build mongoDb filter query
    const filter = {};

    // Search by product name (keyword)
    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }
    // Filter by category
    if (category) {
      filter.category = category;
    }
    //filter by brand
    if (brand) {
      filter.brand = brand;
    }
    // Filter by rating
    if (rating) {
      filter.ratings = { $gte: Number(rating) || 0 };
    }
    //filter by rate range
    const priceMin = Number(minPrice);
    const priceMax = Number(maxPrice);
    if (!isNaN(priceMin) || !isNaN(priceMax)) {
      filter.price = {};
      if (!isNaN(priceMin)) filter.price.$gte = priceMin;
      if (!isNaN(priceMax)) filter.price.$lte = priceMax;
    }

    //now sorting Options
    const sortOption = {};
    
    if (sort === "low") sortOption.price = 1;
    else if (sort === "high") sortOption.price = -1;
    else if (sort === "rating") sortOption.ratings = -1;
    else if (sort === "newest") sortOption.createdAt = -1;
    else if (sort === "oldest") sortOption.createdAt = 1;

    // for skipping pages
    const skip = (Number(page) - 1) * Number(limit);

    //finally find query
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .lean(); // super important

    //for getting total item
    const total = await Product.countDocuments(filter);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const {id} = req.params;

    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Failed to get single product"
    })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const { name, description, price, stock, brand, category, colors, sizes, specifications} = req.body;

    //find product
    const product = await Product.findById(id);
    if(!product){
      return res.status(404).json({
        success:false,
        message:"Product not found"
      })
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (colors) product.colors = JSON.parse(colors);
    if (sizes) product.sizes = JSON.parse(sizes);
    if (specifications) product.specifications = JSON.parse(specifications);

    // Images update
    if (req.files && req.files.length > 0) {
      // delete old images from Cloudinary
        const oldImages = product.images;
        const deletePromises = oldImages.map((img) =>
          cloudinary.uploader.destroy(img.public_id)
        );
        await Promise.all(deletePromises);

      // add new images
      const newImages = req.files.map((file) => ({
        public_id: file.filename,
        url: file.path,
      }));
      product.images = newImages;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Failed to update product"
    })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;

    //find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    //Delete images from Cloudinary
    const deletionPromises = product.images.map((img) =>
      cloudinary.uploader.destroy(img.public_id)
    );
    await Promise.all(deletionPromises);

    //Delete fetched product from DB
    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Failed to delete product"
    })
  }
}
