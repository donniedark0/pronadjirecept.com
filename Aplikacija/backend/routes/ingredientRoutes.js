const express = require("express");
const router = express.Router();
const {
  getIngredientsByCategory,
  getRecipeIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredientController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addIngredient).get(getRecipeIngredients);
router
  .route("/:id")
  .get(getIngredientsByCategory)
  .delete(protect, deleteIngredient)
  .put(protect, updateIngredient);

module.exports = router;
