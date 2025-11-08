import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import env from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import internRoutes from './routes/internRoutes.js';
import { supabase } from './config/supabaseClient.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api', limiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/interns', internRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
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

