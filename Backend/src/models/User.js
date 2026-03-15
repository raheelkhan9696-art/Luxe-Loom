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
    select: false 
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
// Removed 'next' parameter - Mongoose handles async returns automatically
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return; 
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    // If you absolutely must use next here, ensure it's defined in the params
    // but in async/await, throwing or returning works better.
    throw new Error(err);
  }
});

// --- Method to Compare Passwords ---
UserSchema.methods.comparePassword = async function(candidatePassword) {
  // candidatePassword = what user typed
  // this.password = what is in DB (only available if .select('+password') was used)
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;