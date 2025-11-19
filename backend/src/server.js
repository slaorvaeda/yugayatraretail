import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import internRoutes from './routes/internRoutes.js';
import { supabase } from './config/supabaseClient.js';
import { securityHeaders, apiRateLimiter } from './middleware/security.js';

const app = express();

// Security headers
app.use(securityHeaders);

// CORS configuration - restrict to known origins
const allowedOrigins = process.env.CLIENT_URL?.split(',').map(url => url.trim()) || [];
if (allowedOrigins.length === 0) {
  console.warn('⚠️  No CLIENT_URL specified. CORS will be disabled for security.');
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.) in development
    if (!origin && process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    if (allowedOrigins.length === 0) {
      return callback(new Error('CORS policy: No allowed origins configured'));
    }
    
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Origin not allowed'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting
app.use('/api', apiRateLimiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/interns', internRoutes);

// Error handling middleware - prevent information leakage
app.use((err, _req, res, _next) => {
  // Log full error for debugging (in production, use proper logging service)
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    status: err.status
  });

  // Don't expose internal error details to clients
  const statusCode = err.status || 500;
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Handle specific error types
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      message: 'File size exceeds the maximum allowed limit of 10MB'
    });
  }
  
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      message: 'Unexpected file field'
    });
  }

  // Generic error response
  res.status(statusCode).json({
    message: statusCode === 500 
      ? 'An internal server error occurred' 
      : (err.message || 'An error occurred'),
    ...(isDevelopment && { details: err.message, stack: err.stack })
  });
});

const startServer = async () => {
  try {
    const { error } = await supabase.from('users').select('id', { head: true, count: 'exact' }).limit(1);
    if (error) {
      throw error;
    }
    console.log('✅ Successfully connected to Supabase database');
  } catch (connectionError) {
    console.error('❌ Failed to connect to Supabase database:', connectionError.message);
    console.error('Please verify SUPABASE_URL and service role key values in your environment.');
    process.exit(1);
  }

  app.listen(env.port, () => {
    console.log(`🚀 Backend running on port ${env.port}`);
  });
};

startServer();

