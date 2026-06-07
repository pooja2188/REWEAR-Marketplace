const mongoose = require("mongoose");

const SwapSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // The authenticated user initiating the trade proposal
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // The owner of the item being requested
    required: true,
  },
  itemRequested: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // The product the sender wants to receive
    required: true,
  },
  itemOffered: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // The product from the sender's own closet being traded away
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Swap", SwapSchema);
