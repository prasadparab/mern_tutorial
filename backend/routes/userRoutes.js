const express = require("express");
const {
  registerUser,
  authoriseUser,
  updateProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authoriseUser);
router.route("/profile").post(protect, updateProfile);
module.exports = router;
