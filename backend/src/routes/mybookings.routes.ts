import express from 'express';
import * as Controllers from '../controllers/mybookings.controllers';
import protectRoute from '../middleware/auth.middleware';

const router = express.Router();

// /api/my-bookings
router.get('/', protectRoute, Controllers.myBookingsController);

export default router;
