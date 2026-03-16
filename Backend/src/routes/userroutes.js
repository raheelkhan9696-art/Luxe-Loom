import express from 'express';
import { registerUser, authUser, getUserProfile,allUsers } from '../controllers/userController.js';
import { protect,admin } from '../middlewares/Authmiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile); // Protected route
router.get('/all-users', protect,admin, allUsers);

export default router;