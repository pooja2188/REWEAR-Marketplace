const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, walletAddress } = req.body;

    // Check if user already exists
    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Generate secure password hash encryption salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user record
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store securely hashed password
      walletAddress
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully!", user: { username, email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during registration" });
  }
};

const jwt = require("jsonwebtoken"); // Add this line at the very top of the file

// Keep your exports.registerUser logic above...

// --- ADD LOGIN LOGIC HERE ---
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verify that the user exists in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid login credentials" });
    }

    // 2. Check if the typed password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid login credentials" });
    }

    // 3. Generate a secure session token (JWT) valid for 1 day
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
    );

    // 4. Return the token and profile details back to the client
    res.json({
      msg: "Login successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        walletAddress: user.walletAddress
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
};
