import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { optionalResumeUpload } from '../middleware/upload.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', optionalResumeUpload, register);
router.post('/login', login);
router.get('/me', authenticate, me);

export default router;

