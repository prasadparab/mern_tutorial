const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  console.log("route protection");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const x = await User.findById(decoded.id).select("-password");
      req.user = x;
      console.log(x);
      next();
    } catch (e) {
      res.status(401);
      throw new Error("Not Authorised, token failed");
    }
  } else {
    res.status(401).json({ msg: "Unauthorised" });
    throw new Error("Not Authorised, token failed");
  }
};

module.exports = { protect };
