import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Please provide a name"] 
  },
  email: { 
    type: String, 
    required: [true, "Please provide an email"], 
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { 
    type: String, 
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false // This prevents the password from being returned in API queries by default
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  tier: { 
    type: String, 
    enum: ['Privileged', 'Heritage', 'Archival'], 
    default: 'Archival' 
  }
}, { timestamps: true });

// --- Password Hashing Logic ---
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// --- Method to Compare Passwords ---
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;