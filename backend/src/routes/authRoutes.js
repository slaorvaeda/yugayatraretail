import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { optionalResumeUpload } from '../middleware/upload.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authRateLimiter } from '../middleware/security.js';

const router = Router();

// Apply stricter rate limiting to auth endpoints
router.post('/register', authRateLimiter, optionalResumeUpload, register);
router.post('/login', authRateLimiter, login);
router.get('/me', authenticate, me);

export default router;

