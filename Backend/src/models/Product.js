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
    // Removed 'required: true' here because we generate it automatically before validation
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
    enum: ['Watches', 'Jewelry', 'Accessories', 'Archival']
  },
  material: { 
    type: String, 
    enum: ['18K Gold', '24K Gold', 'Platinum', 'Sterling Silver', 'Stainless Steel'],
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
// We use 'save' instead of 'validate' for better reliability
// We remove 'next' and use async/await style
ProductSchema.pre('save', async function() {
  if (this.isModified('name') || this.isNew) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/[\s_-]+/g, '-')  // Replace spaces/underscores with -
      .replace(/^-+|-+$/g, '');   // Trim - from ends
  }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;