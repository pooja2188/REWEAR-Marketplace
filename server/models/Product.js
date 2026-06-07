// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   image: {
//     type: String, // Will store image URLs
//     required: true,
//   },
//   condition: {
//     type: String, // e.g., "New", "Like New", "Good", "Fair"
//     required: true,
//   },
//   seller: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // Links the product to the user who created it
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Product", ProductSchema);


const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, required: true },
  image: { type: String },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // ⚡ ADD THIS FIELD SO MONGOOSE ALLOWS THE FLAG TO BE UPDATED
  isTraded: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
