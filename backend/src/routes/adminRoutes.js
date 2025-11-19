import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';
import {
  getDashboardSummary,
  listInterns,
  updateInternStatus,
  addRoutineEntry,
  addProgression
} from '../controllers/adminController.js';
import { getInternDashboard } from '../controllers/internController.js';

const router = Router();

router.use(authenticate, requireRole('admin'));

router.get('/dashboard', getDashboardSummary);
router.get('/interns', listInterns);
router.get('/interns/:internId', getInternDashboard);
router.patch('/interns/:internId/status', updateInternStatus);
router.post('/interns/:internId/routines', addRoutineEntry);
router.post('/interns/:internId/progression', addProgression);

export default router;

