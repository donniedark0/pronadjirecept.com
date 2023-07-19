const asyncHandler = require("express-async-handler");

const Category = require("../models/categoryModel");
const Ingredient = require("../models/ingredientModel");
const Recipe = require("../models/recipeModel");
//cao Darko
//cao ema
//kako si
//@desc     Get categories
//@route    GET /api/categories
//@access   Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json(categories);
});

//@desc     Add category
//@route    POST /api/categories
//@access   Private
const addCategory = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add the category name");
  }

  const category = await Category.create({
    name: req.body.name,
  });

  res.status(200).json(category);
});

//@desc     Update category
//@route    PUT /api/categories/:id
//@access   Private
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("category not found");
  }

  //new: true - kreira ga ako ne postoji
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCategory);
});

//@desc     Delete category
//@route    DELETE /api/categories
//@access   Private
const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  await Recipe.deleteMany({ ingredients: { $in: categoryId } });
  await Ingredient.deleteMany({ categoryId });

  const deletedCategory = await Category.findByIdAndDelete(categoryId);

  if (!deletedCategory) {
    res.status(400);
    throw new Error("Category not found");
  }

  res.status(200).json({ id: deletedCategory._id });
});

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
};
