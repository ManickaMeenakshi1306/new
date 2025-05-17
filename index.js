import express from 'express';
import listingRoutes from './listing.routes.js';
import authRoutes from './auth.routes.js'; // If you have auth routes

const router = express.Router();

router.get('/hello', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Mount your routes under their prefixes
router.use('/listings', listingRoutes);
router.use('/auth', authRoutes);  // Optional

export default router;
