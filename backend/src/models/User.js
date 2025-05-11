const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'staff', 'user'],
    default: 'user'
  },
  specialties: [{
    type: String
  }],
  schedule: {
    monday: {
      start: String,
      end: String,
      available: Boolean
    },
    tuesday: {
      start: String,
      end: String,
      available: Boolean
    },
    wednesday: {
      start: String,
      end: String,
      available: Boolean
    },
    thursday: {
      start: String,
      end: String,
      available: Boolean
    },
    friday: {
      start: String,
      end: String,
      available: Boolean
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 