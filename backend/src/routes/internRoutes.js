import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';
import {
  getInternDashboard,
  submitRoutineUpdate,
  submitProgressUpdate
} from '../controllers/internController.js';

const router = Router();

router.use(authenticate, requireRole('intern'));

router.get('/me', getInternDashboard);
router.post('/routine', submitRoutineUpdate);
router.post('/progress', submitProgressUpdate);

export default router;

