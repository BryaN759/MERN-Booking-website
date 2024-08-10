import express from 'express';
import * as Controllers from '../controllers/thehotels.controllers';

const router = express.Router();

// /api/hotels
router.get('/search', Controllers.searchController);

export default router;
