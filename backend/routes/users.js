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
    updateStaffSchedule
} from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/create-admin', createAdmin);

// Protected routes
router.get('/me', auth, getCurrentUser);

// Staff management routes (protected)
router.get('/staff', auth, getStaff);
router.post('/staff', auth, createStaff);
router.put('/staff/:id', auth, updateStaff);
router.delete('/staff/:id', auth, deleteStaff);
router.put('/staff/:id/schedule', auth, updateStaffSchedule);

export default router; 