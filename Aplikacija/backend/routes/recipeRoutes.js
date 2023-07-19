const express = require("express");
const router = express.Router();
const {
  getUsersRecipes,
  getAllRecipes,
  getRecipesByIngerdients,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, addRecipe)
  .put(getRecipesByIngerdients)
  .get(getAllRecipes);
router
  .route("/:id")
  .get(protect, getUsersRecipes)
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe);

module.exports = router;
