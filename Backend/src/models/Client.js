import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  // Link back to the Auth User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // Personalization
  phoneNumber: { type: String, trim: true },
  dateOfBirth: { type: Date },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other', 'Prefer not to say'] 
  },
  
  // Luxury Tiering
  tier: { 
    type: String, 
    enum: ['Archival', 'Heritage', 'Privileged'], 
    default: 'Archival' 
  },
  
  // Financial Tracking (Automated by Backend)
  totalSpent: { type: Number, default: 0 },
  ordersCount: { type: Number, default: 0 },

  // Preferences (For "Aesthetic" Recommendations)
  preferences: {
    favoriteMaterial: { 
      type: String, 
      enum: ['Gold', 'Platinum', 'Silver', 'Leather'] 
    },
    watchInterest: { type: Boolean, default: false },
    jewelryInterest: { type: Boolean, default: false }
  },

  // Address Book
  savedAddresses: [{
    label: { type: String, default: 'Home' }, // Home, Office, etc.
    address: String,
    city: String,
    postalCode: String,
    country: { type: String, default: 'Pakistan' }
  }]
}, { timestamps: true });

const Client = mongoose.model('Client', ClientSchema);
export default Client;