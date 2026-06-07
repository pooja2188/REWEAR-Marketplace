// const express = require("express");
// const router = express.Router();
// const productController = require("../controllers/productController");
// const authMiddleware = require("../middleware/auth");

// // Path: POST http://localhost:5000/api/products
// router.post("/", authMiddleware, productController.createProduct);

// // Path: GET http://localhost:5000/api/products
// router.get("/", productController.getAllProducts);


// // FETCH PERSONAL ITEMS (GET http://localhost:5000/api/products/user/my-items)
// router.get("/user/my-items", authMiddleware, async (req, res) => {
//   try {
//     // Looks up items matching the exact user ID encrypted inside the JWT token header
//     const personalItems = await Product.find({ seller: req.user.userId });
//     res.json(personalItems);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error fetching your closet items" });
//   }
// });

// // REMOVE A LISTING (DELETE http://localhost:5000/api/products/:id)
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const item = await Product.findById(req.params.id);
    
//     if (!item) {
//       return res.status(404).json({ error: "Item not found" });
//     }

//     // Security checkpoint: Enforce that only the true seller can wipe this product card
//     if (item.seller.toString() !== req.user.userId) {
//       return res.status(401).json({ error: "User not authorized to delete this card" });
//     }

//     await item.deleteOne();
//     res.json({ msg: "Product listing removed successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error while removing product card" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/auth");

// Path: POST http://localhost:5000/api/products
router.post("/", authMiddleware, productController.createProduct);

// Path: GET http://localhost:5000/api/products
router.get("/", productController.getAllProducts);

// --- ADDED NEW ROUTES BELOW ---

// Path: GET http://localhost:5000/api/products/user/my-items
// Note: This must come BEFORE the /:id route so the server doesn't mistake "user" for a product ID string!
router.get("/user/my-items", authMiddleware, productController.getMyProducts);

// Path: DELETE http://localhost:5000/api/products/:id
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
