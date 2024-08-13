import express from 'express';
import * as Controllers from '../controllers/thehotels.controllers';
import protectRoute from '../middleware/auth.middleware';

const router = express.Router();

// /api/hotels
router.get('/search', Controllers.searchController);
router.get('/', Controllers.homeController);
router.get('/:id', Controllers.viewDetailController);
router.post(
    '/:hotelId/bookings/payment-intent',
    protectRoute,
    Controllers.stripePaymentController
);
router.post('/:hotelId/bookings', protectRoute, Controllers.bookingController);

export default router;
