// server/routes/swapRoutes.js
const express = require("express");
const router = express.Router();

// Import your newly created controller
const swapController = require("../controllers/swapController");

// Import your session token verification middleware
const authMiddleware = require("../middleware/auth");

// Path: POST http://localhost:5000/api/swaps (Creates a proposal)
router.post("/", authMiddleware, swapController.createSwapRequest);

// Path: GET http://localhost:5000/api/swaps/my-requests (Fetches user's incoming offers)
router.get("/my-requests", authMiddleware, swapController.getMySwapRequests);

// Path: GET http://localhost:5000/api/swaps/sent-requests
router.get("/sent-requests", authMiddleware, async (req, res) => {
  try {
    const Swap = require("../models/Swap");
    const sent = await Swap.find({ sender: req.user.userId })
      .populate("receiver", "username email")
      .populate("itemRequested", "title price image")
      .populate("itemOffered", "title price image");
    
    res.json(sent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching sent swap history." });
  }
});


// Path: PUT http://localhost:5000/api/swaps/:id/status (Accepts/Declines an offer)
router.put("/:id/status", authMiddleware, swapController.updateSwapStatus);

module.exports = router;
