// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose"); // Added
// const dotenv = require("dotenv");     // Added

// // Load environment variables from your .env file
// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // --- CONNECT TO MONGODB ATLAS ---
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Successfully connected to MongoDB Atlas!"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));
// // --------------------------------


// // Link your authentication route controllers
// app.use("/api/auth", require("./routes/authRoutes"));


// app.get("/", (req, res) => {
//   res.send("ReWear Backend Running");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); 
const dotenv = require("dotenv");     

// Load environment variables from your .env file
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// --- CONNECT TO MONGODB ATLAS ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB Atlas!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
// --------------------------------

// 1. Link your authentication route controllers
app.use("/api/auth", require("./routes/authRoutes"));

// 2. Link your core marketplace product listings routes
app.use("/api/products", require("./routes/productRoutes"));

// 3. Link your newly created barter swap request routes 
app.use("/api/swaps", require("./routes/swapRoutes"));


app.get("/", (req, res) => {
  res.send("ReWear Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
