import { z } from 'zod';

// Sanitize string inputs - removes potential XSS vectors
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/[<>]/g, '');
};

export const updateInternStatusSchema = z.object({
  activationStatus: z.enum(['pending', 'active', 'inactive', 'rejected']),
  meetLink: z
    .string()
    .url('Invalid URL format')
    .max(500, 'URL is too long')
    .refine((url) => {
      try {
        const urlObj = new URL(url);
        return ['http:', 'https:'].includes(urlObj.protocol);
      } catch {
        return false;
      }
    }, 'Invalid URL protocol')
    .transform(sanitizeString)
    .optional(),
  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .transform(sanitizeString)
    .nullable()
    .optional()
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
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters')
    .transform(sanitizeString)
    .refine((val) => val.length >= 3, 'Title is required'),
  summary: z
    .string()
    .min(3, 'Summary must be at least 3 characters')
    .max(1000, 'Summary must be less than 1000 characters')
    .transform(sanitizeString)
    .refine((val) => val.length >= 3, 'Summary is required'),
  status: z.enum(['planned', 'in_progress', 'completed', 'blocked']),
  hoursSpent: numberFromString(z.number().min(0).max(24)),
  blockers: z
    .string()
    .max(500, 'Blockers must be less than 500 characters')
    .transform(sanitizeString)
    .nullable()
    .optional()
});

export const progressionSchema = z.object({
  milestone: z
    .string()
    .min(3, 'Milestone must be at least 3 characters')
    .max(200, 'Milestone must be less than 200 characters')
    .transform(sanitizeString)
    .refine((val) => val.length >= 3, 'Milestone is required'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .transform(sanitizeString)
    .refine((val) => val.length >= 3, 'Description is required'),
  progressPercent: numberFromString(z.number().min(0).max(100)),
  targetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
});

