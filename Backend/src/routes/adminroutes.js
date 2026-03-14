import express from 'express';
const router = express.Router();

// Named imports from your middleware and controller
import { protect, admin } from '../middlewares/AuthMiddleware.js';
import { 
  getDashboardStats, 
  updateOrderStatus 
} from '../controllers/adminController.js';

// All routes below this line will require Login AND Admin Role
router.use(protect);
router.use(admin);

router.get("/stats", getDashboardStats);
router.put("/order/:id/status", updateOrderStatus);

export default router;