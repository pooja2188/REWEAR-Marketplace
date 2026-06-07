// server/controllers/swapController.js
const Swap = require("../models/Swap");
const Product = require("../models/Product");

// 1. Propose a new clothing trade request
exports.createSwapRequest = async (req, res) => {
  try {
    const { receiver, itemRequested, itemOffered } = req.body;

    // Safety validation check to make sure IDs aren't empty
    if (!receiver || !itemRequested || !itemOffered) {
      return res.status(400).json({ error: "Missing required product or seller fields." });
    }

    const newSwap = new Swap({
      sender: req.user.userId, // Pulled securely from verified JWT session token middleware
      receiver,
      itemRequested,
      itemOffered,
    });

    const savedSwap = await newSwap.save();
    res.status(201).json({ msg: "Swap request sent successfully!", swap: savedSwap });
  } catch (err) {
    console.error("Mongoose validation crash error details:", err);
    res.status(500).json({ error: "Server error creating swap request database entry." });
  }
};

// 2. Fetch all incoming trade requests for the logged-in user
exports.getMySwapRequests = async (req, res) => {
  try {
    const requests = await Swap.find({ receiver: req.user.userId })
      .populate("sender", "username email")
      .populate("itemRequested", "title price image")
      .populate("itemOffered", "title price image");
    
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching swap dashboard details." });
  }
};

// 3. Accept or Reject a pending trade offer
exports.updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body; // Expects "Approved" or "Rejected"
    
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ error: "Swap transaction not found." });

    // Ensure only the intended receiver can approve or deny this transaction
    if (swap.receiver.toString() !== req.user.userId) {
      return res.status(401).json({ error: "Unauthorized access action denied." });
    }

    swap.status = status;
    await swap.save();

    res.json({ msg: `Swap offer successfully ${status.toLowerCase()}!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error updating transaction status." });
  }
};


// ⚡ ADD THIS TO THE BOTTOM OF YOUR CONTROLLER
exports.getSentRequests = async (req, res) => {
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
};

// server/controllers/swapController.js -> updateSwapStatus

exports.updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body; // Expects "Approved" or "Rejected"
    
    // Find the swap transaction record entry
    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ error: "Swap transaction document not found." });
    }

    // Security validation checkpoint
    if (swap.receiver.toString() !== req.user.userId) {
      return res.status(401).json({ error: "Unauthorized access action denied." });
    }

    swap.status = status;
    await swap.save();

    // ⚡ BULLETPROOF AUTOMATION HIDE PATCH:
    // If the offer hits Approved status, we search and lock down BOTH item listings
    if (status === "Approved") {
      console.log("⚡ Swap Approved! Archiving Traded Items from Public Feed...");
      console.log(`Requested Item ID: ${swap.itemRequested} | Offered Item ID: ${swap.itemOffered}`);

      const Product = require("../models/Product");

      // Set the marketplace filter parameters to true on both database cards
      await Product.findByIdAndUpdate(swap.itemRequested, { $set: { isTraded: true } });
      await Product.findByIdAndUpdate(swap.itemOffered, { $set: { isTraded: true } });
      
      console.log("✅ MongoDB Update Complete! Items safely hidden.");
    }

    res.json({ msg: `Swap offer successfully ${status.toLowerCase()}!` });
  } catch (err) {
    console.error("Swap Status Update Crash Error Details:", err);
    res.status(500).json({ error: "Server error updating trade status properties." });
  }
};
