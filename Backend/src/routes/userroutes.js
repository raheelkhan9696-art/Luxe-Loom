import express from 'express';
import { registerUser, authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/Authmiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile); // Protected route

export default router;