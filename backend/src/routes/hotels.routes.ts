import express from 'express';
import * as Controllers from '../controllers/hotels.controllers';
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

export default router;
