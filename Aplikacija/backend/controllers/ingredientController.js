const asyncHandler = require("express-async-handler");

const Ingredient = require("../models/ingredientModel");
const Recipe = require("../models/recipeModel");

//@desc     Get ingredients
//@route    GET /api/ingredients
//@access   Public
const getRecipeIngredients = asyncHandler(async (req, res) => {
  const ingredientIds = req.body.ingredients;
  const sendIngredients = [];

  for (const ingredientId of ingredientIds) {
    const ingredient = await Ingredient.findById(ingredientId);
    if (ingredient) {
      sendIngredients.push(ingredient);
    }
  }

  res.status(200).json(sendIngredients);
});

//@desc     Get ingredients by category
//@route    GET /api/ingredients/:id
//@access   Public
const getIngredientsByCategory = asyncHandler(async (req, res) => {
  const ingredients = await Ingredient.find({ categoryId: req.params.id });

  res.status(200).json(ingredients);
});

//@desc     Add ingredient
//@route    POST /api/ingredients
//@access   Private
const addIngredient = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add the ingredient name");
  }

  const ingredient = await Ingredient.create({
    name: req.body.name,
    categoryId: req.body.categoryId,
  });

  res.status(200).json(ingredient);
});

//@desc     Update ingredients
//@route    PUT /api/ingredients/:id
//@access   Private
const updateIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);

  if (!ingredient) {
    res.status(400);
    throw new Error("Ingredient not found");
  }

  //new: true - kreira ga ako ne postoji
  const updatedIngredient = await Ingredient.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedIngredient);
});

//@desc     Delete ingredient
//@route    DELETE /api/ingredients/:id
//@access   Private
const deleteIngredient = asyncHandler(async (req, res) => {
  const ingredientId = req.params.id;

  const deletedIngredient = await Ingredient.findByIdAndDelete(ingredientId);

  await Recipe.deleteMany({ ingredients: ingredientId });
  if (!deletedIngredient) {
    res.status(400);
    throw new Error("Ingredient not found");
  }

  res.status(200).json({ id: deletedIngredient._id });
});

module.exports = {
  getIngredientsByCategory,
  addIngredient,
  updateIngredient,
  deleteIngredient,
  getRecipeIngredients,
};
