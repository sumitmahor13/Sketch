import express from 'express';
import { isAuthenticated }  from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/productController.js';
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get('/', getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/", isAuthenticated, isAdmin, upload.array("images", 6), createProduct);    //middlewares are applied
router.put("/:id", isAuthenticated, isAdmin, upload.array("images", 6), updateProduct);     //middlewares are applied
router.delete("/:id", isAuthenticated, isAdmin, deleteProduct);     //middlewares are applied

export default router;