const asyncHandler = require("express-async-handler");

const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

//@desc     Get users recipes
//@route    GET /api/recipes/:id
//@access   Public
const getUsersRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ userId: req.params.id });

  res.status(200).json(recipes);
});

//@desc     Get top 10 recipes
//@route    GET /api/recipes
//@access   Public
const getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find();

  res.status(200).json(recipes);
});

const getRecipesByIngerdients = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find();
  const selectedIngredients = req.body;

  const chosenRecipes = [];

  recipes.forEach((recipe) => {
    var counter = 0;
    if (recipe.ingredients.length <= selectedIngredients.length) {
      recipe.ingredients.forEach((recipeIngredient) => {
        selectedIngredients.forEach((ingredient, index) => {
          if (recipeIngredient._id == ingredient) {
            counter++;
          }
        });
      });

      if (counter == recipe.ingredients.length) {
        chosenRecipes.push(recipe);
      }
    }
  });
  res.status(200).json(chosenRecipes);
});

//@desc     Add recipe
//@route    POST /api/recipes/:id
//@access   Private
const addRecipe = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (
    !req.body.name &&
    !req.body.description &&
    !req.body.imagePath &&
    !req.body.ingredients
  ) {
    res.status(400);
    throw new Error("Please fill all of the fields!");
  }

  const recipe = await Recipe.create({
    name: req.body.name,
    description: req.body.description,
    userId: req.body.userId,
    imagePath: req.body.imagePath,
    ingredients: req.body.selectedIngredients,
    rating: 1,
  });

  res.status(200).json(recipe);
});

//@desc     Edit recipe
//@route    PUT /api/recipes/:id
//@access   Private
const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(400);
    throw new Error("Recipe not found");
  }

  //new: true - kreira ga ako ne postoji
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  console.log(updatedRecipe);
  res.status(200).json(updatedRecipe);
});

//@desc     Delete recipe
//@route    DELETE /api/recipes/:id
//@access   Private
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  console.log(recipe);
  if (!recipe) {
    res.status(400);
    throw new Error("Recipe not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (recipe.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Comment.deleteMany({ recipeId: recipe.id });

  await Recipe.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  addRecipe,
  getUsersRecipes,
  getAllRecipes,
  getRecipesByIngerdients,
  updateRecipe,
  deleteRecipe,
};
