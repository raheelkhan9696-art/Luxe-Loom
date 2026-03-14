import express from 'express';
import upload from '../config/cloudinary.js';
import { protect, admin } from '../middlewares/Authmiddleware.js';

const router = express.Router();

// 'image' is the field name sent from the frontend
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({
      message: 'Image uploaded to cloud successfully',
      url: req.file.path, // This is the public Cloudinary URL
    });
  } else {
    res.status(400).json({ message: 'Failed to upload image' });
  }
});

export default router;