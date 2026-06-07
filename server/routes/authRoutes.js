const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Path: POST http://localhost:5000/api/auth/register
router.post("/register", authController.registerUser);

// Path: POST http://localhost:5000/api/auth/login
router.post("/login", authController.loginUser); // Add this line

module.exports = router;
