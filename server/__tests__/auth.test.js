const jwt = require('jsonwebtoken');

// Set JWT_SECRET for testing
process.env.JWT_SECRET = 'test-secret-key';

describe('Auth Middleware', () => {
  const { protect, adminOnly } = require('../middleware/authMiddleware');

  // Mock objects
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  describe('protect middleware', () => {
    it('should return 401 if no token is provided', async () => {
      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Not authorized. No token.' })
      );
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 for invalid token', async () => {
      req.headers.authorization = 'Bearer invalid-token';

      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Token invalid or expired.' })
      );
    });

    it('should accept Bearer prefix format', async () => {
      req.headers.authorization = 'some-token-without-bearer';

      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Not authorized. No token.' })
      );
    });
  });

  describe('adminOnly middleware', () => {
    it('should call next() for admin users', () => {
      req.user = { role: 'admin' };

      adminOnly(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 403 for non-admin users', () => {
      req.user = { role: 'collector' };

      adminOnly(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Admin access only.' })
      );
    });

    it('should return 403 when no user is present', () => {
      req.user = null;

      adminOnly(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
    });
  });
});

describe('JWT Token', () => {
  it('should verify a valid token', () => {
    const token = jwt.sign({ id: 'user123' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    expect(decoded.id).toBe('user123');
  });

  it('should reject an expired token', () => {
    const token = jwt.sign({ id: 'user123' }, process.env.JWT_SECRET, { expiresIn: '0s' });

    expect(() => jwt.verify(token, process.env.JWT_SECRET)).toThrow();
  });

  it('should reject a token with wrong secret', () => {
    const token = jwt.sign({ id: 'user123' }, 'wrong-secret');

    expect(() => jwt.verify(token, process.env.JWT_SECRET)).toThrow();
  });
});
