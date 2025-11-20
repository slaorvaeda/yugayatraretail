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
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV !== 'production';
let allowedOrigins = process.env.CLIENT_URL?.split(',').map(url => url.trim()).filter(Boolean) || [];

// In development, allow localhost if CLIENT_URL is not set
if (allowedOrigins.length === 0 && isDevelopment) {
  allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
  console.warn('⚠️  No CLIENT_URL specified. Allowing localhost in development mode.');
} else if (allowedOrigins.length === 0) {
  console.warn('⚠️  No CLIENT_URL specified. CORS will be disabled for security.');
}

app.use(cors({
  origin: (origin, callback) => {
    try {
      // Allow requests with no origin (mobile apps, Postman, curl, etc.) in development
      if (!origin && isDevelopment) {
        return callback(null, true);
      }
      
      // In development, always allow localhost origins
      if (isDevelopment && origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
        return callback(null, true);
      }
      
      // If no allowed origins configured and not in development, reject
      if (allowedOrigins.length === 0) {
        return callback(new Error('CORS policy: No allowed origins configured'));
      }
      
      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      
      // Reject if not in allowed list
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    } catch (error) {
      console.error('CORS error:', error);
      callback(error);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware (development only)
if (isDevelopment) {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
  });
}

// Apply rate limiting
app.use('/api', apiRateLimiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/interns', internRoutes);

// Error handling middleware - prevent information leakage
app.use((err, req, res, next) => {
  // Log full error for debugging (in production, use proper logging service)
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    status: err.status,
    code: err.code,
    path: req.path,
    method: req.method
  });

  // Don't expose internal error details to clients
  const statusCode = err.status || err.statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Handle CORS errors
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({
      message: 'CORS policy: Origin not allowed'
    });
  }
  
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

  // Make sure response hasn't been sent
  if (res.headersSent) {
    return next(err);
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

  const server = app.listen(env.port, '0.0.0.0', () => {
    console.log(`🚀 Backend running on port ${env.port}`);
    console.log(`📡 Server listening on http://localhost:${env.port}`);
    if (isDevelopment) {
      console.log(`🔧 Development mode: CORS allows localhost`);
    }
  });

  // Handle server errors
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${env.port} is already in use`);
      process.exit(1);
    } else {
      console.error('❌ Server error:', error);
      process.exit(1);
    }
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
  });
};

startServer();

