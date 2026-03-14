import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  // Basic Info
  name: { 
    type: String, 
    required: [true, "Product name is required"], 
    trim: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String, 
    required: [true, "Product description is required"] 
  },

  // Luxury Attributes
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
  
  // Pricing & Inventory
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

  // Media (Array for multiple gallery views)
  images: [{
    url: { type: String, required: true },
    alt: { type: String }
  }],
  mainImage: { 
    type: String, 
    required: true // The primary hero image for the shop grid
  },

  // Admin & Metadata
  isActive: { 
    type: Boolean, 
    default: true 
  },
  ratings: { 
    type: Number, 
    default: 0 
  },
  numReviews: { 
    type: Number, 
    default: 0 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Tracks which admin (e.g., Abdullah) created the entry
  }
}, { 
  timestamps: true // Tracks when products were added or updated
});

// Middleware to create a slug from the name before saving (e.g., "Gold Watch" -> "gold-watch")
ProductSchema.pre('validate', function(next) {
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  next();
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;