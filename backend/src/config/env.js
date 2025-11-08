import dotenv from 'dotenv';

dotenv.config();

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET;

const requiredEnv = [
  'PORT',
  'SUPABASE_URL',
  serviceRoleKey ? null : 'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
].filter(Boolean);

requiredEnv.forEach((key) => {
  if (!process.env[key] && key !== 'SUPABASE_SERVICE_ROLE_KEY') {
    console.warn(`⚠️  Missing environment variable: ${key}`);
  }
  if (key === 'SUPABASE_SERVICE_ROLE_KEY' && !serviceRoleKey) {
    console.warn('⚠️  Missing SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET) variable.');
  }
});

const env = {
  port: process.env.PORT ? Number(process.env.PORT) : 5000,
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceKey: serviceRoleKey || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || ''
  }
};

export default env;

