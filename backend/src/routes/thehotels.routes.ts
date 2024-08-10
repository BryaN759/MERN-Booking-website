import express from 'express';
import * as Controllers from '../controllers/thehotels.controllers';

const router = express.Router();

// /api/hotels
router.get('/search', Controllers.searchController);
router.get('/:id', Controllers.viewDetailController);

export default router;
