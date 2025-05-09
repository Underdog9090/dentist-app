import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({
            username,
            email,
            password
        });

        await user.save();

        // Create token
        const token = jwt.sign(
            { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                role: user.role  // Add role to token
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
export const login = async (req, res) => {
    console.log('Login endpoint hit', req.body); // Logging
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        console.log('User found:', user); // Logging
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        console.log('Password match:', isMatch); // Logging
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error); // Logging
        res.status(400).json({ message: error.message });
    }
};

// Get current user
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create admin user
export const createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new admin user
        const user = new User({
            username,
            email,
            password,
            role: 'admin'  // Set role as admin
        });

        await user.save();

        // Create token
        const token = jwt.sign(
            { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all staff users
export const getStaff = async (req, res) => {
    try {
        const staff = await User.find({ role: 'staff' }).select('-password');
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};