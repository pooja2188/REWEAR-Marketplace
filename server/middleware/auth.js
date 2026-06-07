const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  // Splits "Bearer <token_string>" into an array
  const tokenArray = authHeader.split(" ");
  const actualToken = tokenArray[1]; // Extract just the raw cryptographic string

  try {
    // --- FIXED: Use actualToken here instead of tokenArray ---
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
