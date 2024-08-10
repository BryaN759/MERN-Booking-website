import express from 'express';
import * as Controllers from '../controllers/myhotels.controllers';
import protectRoute from '../middleware/auth.middleware';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// /api/my-hotels
router.post(
    '/',
    protectRoute,
    upload.array('imageFiles', 6),
    Controllers.hotelsController
);

router.get('/', protectRoute, Controllers.getAllHotelsController);

router.get('/:id', protectRoute, Controllers.fetchHotelByIdController);
router.put(
    '/:id',
    protectRoute,
    upload.array('imageFiles'),
    Controllers.editHotelController
);

export default router;
