import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      brand,
      category,
      colors,
      sizes,
      specifications,
    } = req.body;

    // basic field check
    if (!name || !description || !price || !stock || !brand || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log(":::",req.files)

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
        const {keyword, category, brand, minPrice, maxPrice, rating, sort, page = 1, limit = 10} = req.query;

        //build mongoDb filter query
        const filterQuery = {};

        // Search by product name (keyword)
        if(keyword){
            filterQuery.name = { $regex: keyword, $options: "i" }; // case-insensitive search
        }
        // Filter by category
        if(category){
            filterQuery.category = category;
        }
        //filter by brand
        if(brand){
            filterQuery.brand = brand;
        }
        // Filter by rating
        if (rating) {
            filterQuery.ratings = { $gte: Number(rating) }; // rating >= given
        }
        if(minPrice || maxPrice){
            filterQuery.price = {};
            if(minPrice) filterQuery.price.$gte = Number(minPrice);
            if(maxPrice) filterQuery.price.$lte = Number(maxPrice);
        }

        // Sorting
        const sortOption = {};

        if(sort === 'low'){
            sortOption.price = 1;  //acending
        }else if(sort === 'high'){
            sortOption.price = -1; // descending
        }else if(sort === 'rating'){
            sortOption.ratings = -1;  //sort by ratings
        }else if(sort === 'newest'){
            sortOption.createdAt = -1; // new products first
        }else if (sort === "oldest") {
            sortOption.createdAt = 1; // old product first
        }

        // Pagination logic
        const skip = (Number(page) - 1) * Number(limit);

        console.log(filterQuery)

        // Fetch products from DB
        const products = await Product.find(filterQuery)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        const total = Product.countDocuments(filterQuery);

        res.status(200).json({
            success:true,
            message:"Product fetched",
            page: Number(page),
            limit: Number(limit),
            count: products.length,
            total,
            products
        })

    } catch (error) {
        console.error("Error in getAllProducts", error);
            res.status(500).json({
            success: false,
            message: "Something went wrong while fetching products",
        });
    }
}
