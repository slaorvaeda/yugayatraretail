import { z } from 'zod';

export const updateInternStatusSchema = z.object({
  activationStatus: z.enum(['pending', 'active', 'inactive', 'rejected']),
  meetLink: z.string().url().optional(),
  notes: z.string().max(500).nullable().optional()
});

const numberFromString = (schema) =>
  z.preprocess((val) => {
    if (typeof val === 'string' && val.trim() !== '') {
      const parsed = Number(val);
      return Number.isNaN(parsed) ? val : parsed;
    }
    return val;
  }, schema);

export const routineEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  title: z.string().min(3).max(200),
  summary: z.string().min(3).max(1000),
  status: z.enum(['planned', 'in_progress', 'completed', 'blocked']),
  hoursSpent: numberFromString(z.number().min(0).max(24)),
  blockers: z.string().max(500).nullable().optional()
});

export const progressionSchema = z.object({
  milestone: z.string().min(3).max(200),
  description: z.string().min(3).max(1000),
  progressPercent: numberFromString(z.number().min(0).max(100)),
  targetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});

