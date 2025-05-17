import express from 'express';
import { getNearbyListingsController } from '../controllers/listing.controller.js';

const router = express.Router();

router.get('/nearby', getNearbyListingsController);

export default router;
