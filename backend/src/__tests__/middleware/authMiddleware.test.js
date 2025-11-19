import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import env from '../../config/env.js';
import { authenticate, requireRole } from '../../middleware/authMiddleware.js';

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
      user: null
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  describe('authenticate', () => {
    it('should return 401 if authorization header is missing', () => {
      authenticate(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Authorization header missing' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if authorization header does not start with Bearer', () => {
      req.headers.authorization = 'Invalid token';
      authenticate(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Authorization header missing' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', () => {
      req.headers.authorization = 'Bearer invalid-token';
      authenticate(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next() and set req.user for valid token', () => {
      const payload = { id: '123', role: 'intern', email: 'test@example.com' };
      const token = jwt.sign(payload, env.jwtSecret);
      req.headers.authorization = `Bearer ${token}`;
      
      authenticate(req, res, next);
      
      expect(req.user).toBeDefined();
      expect(req.user.id).toBe(payload.id);
      expect(req.user.role).toBe(payload.role);
      expect(req.user.email).toBe(payload.email);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('requireRole', () => {
    it('should return 403 if user is not authenticated', () => {
      const middleware = requireRole('admin');
      middleware(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if user role is not in allowed roles', () => {
      req.user = { id: '123', role: 'intern', email: 'test@example.com' };
      const middleware = requireRole('admin');
      middleware(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next() if user role is in allowed roles', () => {
      req.user = { id: '123', role: 'admin', email: 'admin@example.com' };
      const middleware = requireRole('admin');
      middleware(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should allow multiple roles', () => {
      req.user = { id: '123', role: 'intern', email: 'test@example.com' };
      const middleware = requireRole('admin', 'intern');
      middleware(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  });
});

