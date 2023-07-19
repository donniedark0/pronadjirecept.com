const express = require("express");
const { get } = require("express/lib/response");
const router = express.Router();
const {
  getRecipeComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addComment);
router
  .route("/:id")
  .get(getRecipeComments)
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
