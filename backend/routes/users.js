import express from 'express';
import { register, login, getCurrentUser, createAdmin, getStaff } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/create-admin', createAdmin);

// Protected routes
router.get('/me', auth, getCurrentUser);

// Get all staff users (admin only, but public for now)
router.get('/staff', getStaff);

export default router; 