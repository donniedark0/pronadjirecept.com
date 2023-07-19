const express = require("express");
const { get } = require("express/lib/response");
const router = express.Router();
const {
  getRecipeLikes,
  addRecipeLike,
  deleteRecipeLike,
} = require("../controllers/recipeLikesController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addRecipeLike);
router.route("/:id").get(getRecipeLikes).delete(deleteRecipeLike);

module.exports = router;
