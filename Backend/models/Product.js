import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    rating: {
      type: Number,
      required: true,
    },
    comment: String,
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    maxLength: 8,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
  
  images: {
    type: [
      {
        public_id: String,
        url: String,
      },
    ],
    validate: {
      validator: function (arr) {
        return arr.length >= 4;
      },
      message: "At least 4 product images are required",
    },
  },

  colors: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length >= 1;
      },
      message: "At least 1 color option is required",
    },
  },

  sizes: {
    type: [Number],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length >= 1;
      },
      message: "At least 1 size option is required",
    },
  },

  specifications: {
    type: Map,
    of: String,
    default: {},
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
