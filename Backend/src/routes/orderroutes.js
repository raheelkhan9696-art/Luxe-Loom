import express from 'express';
import { addOrderItems, getMyOrders, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middlewares/Authmiddleware.js';

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

export default router;