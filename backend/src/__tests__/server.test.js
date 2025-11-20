import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Create a minimal test app similar to the main server
const createTestApp = () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  });

  app.use('/api', limiter);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
    });
  });

  return app;
};

describe('Server', () => {
  const app = createTestApp();

  describe('Health Check', () => {
    it('should return 200 and status ok', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(typeof response.body.timestamp).toBe('string');
    });
  });

  describe('Error Handling', () => {
    it('should handle errors with proper status code', async () => {
      // Create a new app instance for this test
      const testApp = express();
      testApp.use(express.json());
      
      // Add a test route that throws an error
      testApp.get('/test-error', (_req, _res, next) => {
        const error = new Error('Test error');
        error.status = 400;
        next(error);
      });

      // Error handler must come after routes
      testApp.use((err, _req, res, _next) => {
        res.status(err.status || 500).json({
          message: err.message || 'Internal Server Error'
        });
      });

      const response = await request(testApp)
        .get('/test-error')
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Test error');
    });
  });
});

