const Product = require("../models/Product");

// 1. Create a brand new listing
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, image, condition } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      image,
      condition,
      seller: req.user.userId, // Pulled safely from JWT token middleware
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error creating listing" });
  }
};

// 2. Fetch all listings globally
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "username email");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching listings" });
  }
};

// 3. Fetch items belonging ONLY to the logged-in user
exports.getMyProducts = async (req, res) => {
  try {
    // Looks up items matching the exact user ID encrypted inside the JWT token header
    const personalItems = await Product.find({ seller: req.user.userId });
    res.json(personalItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching your closet items" });
  }
};

// 4. Remove a listing securely
exports.deleteProduct = async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Security checkpoint: Enforce that only the true seller can wipe this product card
    if (item.seller.toString() !== req.user.userId) {
      return res.status(401).json({ error: "User not authorized to delete this card" });
    }

    await item.deleteOne();
    res.json({ msg: "Product listing removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while removing product card" });
  }
};


// server/controllers/productController.js

exports.getAllProducts = async (req, res) => {
  try {
    // ⚡ FIX: Find products where isTraded is NOT true ($ne means Not Equal)
    const products = await Product.find({ isTraded: { $ne: true } })
      .populate("seller", "username");
    
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error loading catalog" });
  }
};
