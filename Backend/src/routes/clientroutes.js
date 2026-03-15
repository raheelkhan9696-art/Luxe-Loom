import express from 'express';
const router = express.Router();

// Import the client controllers
import { 
    getClientProfile, 
    updateClientProfile, 
    addAddress, 
    deleteAddress 
} from '../controllers/clientController.js';

// Import Authorization Middleware
import { protect } from '../middlewares/Authmiddleware.js';

/**
 * @layer CLIENT_PROTECTION
 * All routes below require a valid JWT token.
 * We use 'protect' to ensure req.user._id is available.
 */
router.use(protect);

// --- 1. Profile & Preferences ---
// GET: Fetch the user's luxury profile
// POST: Create or Update personalization data
router.route('/profile')
    .get(getClientProfile)
    .post(updateClientProfile);

// --- 2. Address Book Management ---
// POST: Add a new saved address
router.post('/address', addAddress);

// DELETE: Remove a specific address by its ID
router.delete('/address/:addressId', deleteAddress);

export default router;