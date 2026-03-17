import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Product name is required"], 
    trim: true 
  },
  slug: { 
    type: String, 
    unique: true 
  },
  description: { 
    type: String, 
    required: [true, "Product description is required"] 
  },
  brand: { 
    type: String, 
    default: "Luxe & Loom" 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Watches', 'Jewelry', 'Accessories', 'Archival', 'High Jewelry',"Caps"] // Added High Jewelry for consistency
  },
  material: { 
    type: String, 
    // FIX: Updated Enum to allow your React state values or remove enum for total flexibility
    enum: [
      '18K Gold', '24K Gold', 'Platinum', 'Sterling Silver', 
      'Stainless Steel', 'Gold / Steel', '18K Gold & Steel','Leather', 'Silk', 'Satin', 'Canvas', 'Nylon', 'Rubber', 'Other'
    ],
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  countInStock: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  images: [{
    url: { type: String, required: true },
    alt: { type: String }
  }],
  mainImage: { 
    type: String, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  }
}, { 
  timestamps: true 
});

// --- MODERN SLUG LOGIC ---
ProductSchema.pre('save', async function() {
  if (this.isModified('name') || this.isNew) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') 
      .replace(/[\s_-]+/g, '-')  
      .replace(/^-+|-+$/g, '');   
  }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;