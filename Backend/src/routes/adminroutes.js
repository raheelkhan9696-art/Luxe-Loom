import express from 'express';
const router = express.Router();

// Import your administrative controllers
import { 
    getDashboardStats, 
    createProduct, 
    updateProduct, 
    getAllOrders, 
    updateOrderStatus, 
    deleteUser 
} from '../controllers/adminController.js';

// Import Authorization Middlewares
import { protect, admin } from '../middlewares/Authmiddleware.js';

/**
 * @layer GLOBAL_ADMIN_PROTECTION
 * All routes below this middleware require:
 * 1. A valid JWT token (protect)
 * 2. A user role of 'admin' (admin)
 */
router.use(protect);
router.use(admin);

// --- 1. Analytics ---
router.get('/dashboard-stats', getDashboardStats);

// --- 2. Product Management ---
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);

// --- 3. Order Oversight ---
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

// --- 4. Client Management ---
router.delete('/users/:id', deleteUser);

export default router;
