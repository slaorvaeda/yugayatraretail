import { describe, it, expect, beforeEach } from '@jest/globals';
import { signToken } from '../../utils/token.js';
import jwt from 'jsonwebtoken';
import env from '../../config/env.js';

describe('Token Utilities', () => {
  describe('signToken', () => {
    it('should sign a token with user payload', () => {
      const payload = {
        id: '123',
        role: 'intern',
        email: 'test@example.com'
      };
      
      const token = signToken(payload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should create a valid JWT token', () => {
      const payload = {
        id: '123',
        role: 'admin',
        email: 'admin@example.com'
      };
      
      const token = signToken(payload);
      const decoded = jwt.verify(token, env.jwtSecret);
      
      expect(decoded.id).toBe(payload.id);
      expect(decoded.role).toBe(payload.role);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.exp).toBeDefined();
      expect(decoded.iat).toBeDefined();
    });

    it('should include expiration time', () => {
      const payload = {
        id: '123',
        role: 'intern',
        email: 'test@example.com'
      };
      
      const token = signToken(payload);
      const decoded = jwt.verify(token, env.jwtSecret);
      
      expect(decoded.exp).toBeDefined();
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      expect(expirationTime).toBeGreaterThan(now);
    });
  });
});

