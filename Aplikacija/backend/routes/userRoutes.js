const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  getUserById,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/:id", getUserById);
router.put("/:id", protect, updateUser);

module.exports = router;
