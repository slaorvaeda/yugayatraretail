import { z } from 'zod';

export const registerSchema = z
  .object({
    role: z.enum(['admin', 'intern']),
    fullName: z.string().min(3).max(120),
    email: z.string().email(),
    phone: z.string().min(10).max(20),
    password: z.string().min(8),
    batch: z.string().optional(),
    meetLink: z.string().url().optional()
  })
  .superRefine((data, ctx) => {
    if (data.role === 'intern') {
      if (!data.batch || data.batch.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Batch is required for interns',
          path: ['batch']
        });
      }
    }
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

