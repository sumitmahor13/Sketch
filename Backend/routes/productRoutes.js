import express from 'express';
import { isAuthenticated }  from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { createProduct } from '../controllers/productController.js';
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAdmin, upload.array("images", 6), createProduct);   //middlewares are applied

export default router;