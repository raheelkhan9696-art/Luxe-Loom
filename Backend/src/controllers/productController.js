import Product from '../models/Product.js';



export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, material, countInStock } = req.body;

    // Check if a file was uploaded to Cloudinary
    const imagePath = req.file ? req.file.path : req.body.mainImage;

    const product = new Product({
      name,
      description,
      price,
      category,
      material,
      countInStock,
      mainImage: imagePath, // This is now the Cloudinary URL
      createdBy: req.user._id
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(400).json({ message: "Product creation failed", error: err.message });
  }
};
// --- 1. GET ALL PRODUCTS ---
// @desc    Fetch all products with optional filtering
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    // Basic filtering: e.g., /api/products?category=Watches
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

// --- 2. GET PRODUCT BY SLUG ---
// @desc    Fetch single product by its URL-friendly slug
// @route   GET /api/products/slug/:slug
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

// --- 3. DELETE PRODUCT (ADMIN) ---
// @desc    Remove a product from the inventory
// @route   DELETE /api/products/:id
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

// --- 4. UPDATE PRODUCT (ADMIN) ---
// @desc    Update stock, price, or details
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  const { name, price, description, mainImage, category, countInStock, material } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.mainImage = mainImage || product.mainImage;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      product.material = material || product.material;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid update data' });
  }
};