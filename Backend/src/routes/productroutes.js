import express from "express";
import {
  getProducts,
  getProductBySlug,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controllers/productController.js";
// FIX 1: Ensure the path matches your folder name exactly (middlewares vs middleware)
// FIX 2: Ensure the filename matches (Authmiddleware.js vs authMiddleware.js)
import { protect, admin } from "../middlewares/Authmiddleware.js"; 
// FIX 3: Ensure this path is correct based on where you saved the upload middleware
import upload from "../middlewares/uploadMiddleware.js"; 

const router = express.Router();

// --- Public Routes ---
router.get("/", getProducts);
router.get("/slug/:slug", getProductBySlug);

// --- Admin Only Routes ---

// Create Product: The 'upload.single' middleware must match the key used in your Frontend FormData
router.post("/", protect, admin, upload.single("mainImage"), createProduct);

// Update Product: Also allows updating the image on Cloudinary
router.put("/:id", protect, admin, upload.single("mainImage"), updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

export default router;