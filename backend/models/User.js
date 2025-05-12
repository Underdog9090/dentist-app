import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'staff', 'patient'],
        default: 'staff'
    },
    schedule: {
        monday: {
            start: { type: String, default: '09:00' },
            end: { type: String, default: '17:00' },
            available: { type: Boolean, default: true }
        },
        tuesday: {
            start: { type: String, default: '09:00' },
            end: { type: String, default: '17:00' },
            available: { type: Boolean, default: true }
        },
        wednesday: {
            start: { type: String, default: '09:00' },
            end: { type: String, default: '17:00' },
            available: { type: Boolean, default: true }
        },
        thursday: {
            start: { type: String, default: '09:00' },
            end: { type: String, default: '17:00' },
            available: { type: Boolean, default: true }
        },
        friday: {
            start: { type: String, default: '09:00' },
            end: { type: String, default: '17:00' },
            available: { type: Boolean, default: true }
        },
        saturday: {
            start: { type: String, default: '10:00' },
            end: { type: String, default: '14:00' },
            available: { type: Boolean, default: false }
        },
        sunday: {
            start: { type: String, default: '10:00' },
            end: { type: String, default: '14:00' },
            available: { type: Boolean, default: false }
        }
    },
    specialties: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User; 