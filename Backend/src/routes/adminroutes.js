import express from 'express';
import multer from 'multer';
const router = express.Router();

import { 
    getDashboardStats, 
    createProduct, 
    updateProduct, 
    getAllOrders, 
    updateOrderStatus, 
    deleteUser, 
    deleteProduct
} from '../controllers/adminController.js';

import { protect, admin } from '../middlewares/Authmiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 7 * 1024 * 1024 } 
});

// Middleware Layer
router.use(protect);
router.use(admin);

// Analytics
router.get('/dashboard-stats', getDashboardStats);

// Product Management
router.post('/products', upload.fields([
    { name: 'mainImage', maxCount: 1 }, 
    { name: 'images', maxCount: 10 } 
]), createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Order Oversight (MATCHED TO FRONTEND)
router.get('/orders', getAllOrders);
router.patch('/orders/:id/status', updateOrderStatus); // Fixed to PATCH

// Client Management
router.delete('/users/:id', deleteUser);

export default router;