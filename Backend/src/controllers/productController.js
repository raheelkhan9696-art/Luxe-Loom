import Product from '../models/Product.js';

// --- 1. CREATE PRODUCT (ADMIN) ---
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, material, countInStock } = req.body;

    // Check if a file was uploaded to Cloudinary, else fallback to body (if provided)
    const imagePath = req.file ? req.file.path : req.body.mainImage;

    const product = new Product({
      name,
      description,
      price,
      category,
      material,
      countInStock,
      mainImage: imagePath, 
      createdBy: req.user._id
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(400).json({ message: "Product creation failed", error: err.message });
  }
};

// --- 2. GET ALL PRODUCTS ---
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    } : {};

    const products = await Product.find({ ...keyword }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// --- 3. GET PRODUCT BY SLUG ---
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details' });
  }
};

// --- 4. DELETE PRODUCT (ADMIN) ---
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed from collection' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- 5. UPDATE PRODUCT (ADMIN) ---
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, countInStock, material } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      // Logic for new Cloudinary upload during update
      const imagePath = req.file ? req.file.path : req.body.mainImage;

      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.mainImage = imagePath || product.mainImage; // Correctly handle new file or keep old
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      product.material = material || product.material;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid update data', error: error.message });
  }
};