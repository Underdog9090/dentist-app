import express from 'express';
import { 
    register, 
    login, 
    getCurrentUser, 
    createAdmin, 
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff,
    updateStaffSchedule,
    updateUserRole,
    getAllUsers
} from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', auth, getCurrentUser);

// Admin only routes
router.post('/create-admin', auth, isAdmin, createAdmin);
router.get('/all', auth, isAdmin, getAllUsers);
router.put('/:id/role', auth, isAdmin, updateUserRole);

// Staff management routes (admin only)
router.get('/staff', auth, isAdmin, getStaff);
router.post('/staff', auth, isAdmin, createStaff);
router.put('/staff/:id', auth, isAdmin, updateStaff);
router.delete('/staff/:id', auth, isAdmin, deleteStaff);
router.put('/staff/:id/schedule', auth, isAdmin, updateStaffSchedule);

export default router; 