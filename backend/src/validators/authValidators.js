import { z } from 'zod';

// Password strength validation
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Sanitize and validate email
const emailSchema = z
  .string()
  .email('Invalid email format')
  .toLowerCase()
  .max(255, 'Email is too long')
  .refine((email) => {
    // Additional email validation
    const localPart = email.split('@')[0];
    return localPart.length <= 64;
  }, 'Invalid email format');

// Sanitize string inputs
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/[<>]/g, '');
};

export const registerSchema = z
  .object({
    role: z.enum(['admin', 'intern']).default('intern'), // Default to intern, admin cannot be registered via API
    fullName: z
      .string()
      .min(3, 'Full name must be at least 3 characters')
      .max(120, 'Full name must be less than 120 characters')
      .transform(sanitizeString)
      .refine((val) => val.length >= 3, 'Full name is required'),
    email: emailSchema,
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .max(20, 'Phone number must be less than 20 characters')
      .regex(/^\+?[0-9\s\-()]+$/, 'Invalid phone number format')
      .transform(sanitizeString),
    password: passwordSchema,
    batch: z.string().max(100).transform(sanitizeString).optional(),
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
      .optional()
  })
  .superRefine((data, ctx) => {
    // Prevent admin registration via API
    if (data.role === 'admin') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Admin accounts cannot be created via registration',
        path: ['role']
      });
    }
    
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
  email: emailSchema,
  password: z.string().min(1, 'Password is required').max(128, 'Password is too long')
});

