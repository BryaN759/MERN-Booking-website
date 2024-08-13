import express from 'express';
import * as Controllers from '../controllers/user.controllers';
import protectRoute from '../middleware/auth.middleware';

const router = express.Router();

router.get('/me', protectRoute, Controllers.getLoggedInUserController);
router.post('/register', Controllers.registerController);
router.post('/login', Controllers.loginController);
router.get('/validate-token', protectRoute, Controllers.tokenController);
router.post('/logout', Controllers.logoutController);

export default router;
