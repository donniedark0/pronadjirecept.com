const asyncHandler = require("express-async-handler");

const RecipeLike = require("../models/recipeLikesModel");
const Recipe = require("../models/recipeModel");

//@desc     Get recipe likes
//@route    GET /api/recipeLikes/:id
//@access   Public

const getRecipeLikes = asyncHandler(async (req, res) => {
  const recipeLikes = await RecipeLike.find({ recipeId: req.params.id });
  res.status(200).json(recipeLikes);
});

//@desc     Add recipe like
//@route    POST /api/recipeLikes
//@access   Private
const addRecipeLike = asyncHandler(async (req, res) => {
  console.log(req.body);
  const recipeLike = await RecipeLike.create({
    like: req.body.like,
    userId: req.body.userId,
    recipeId: req.body.recipeId,
  });
  res.status(200).json(recipeLike);
});

const deleteRecipeLike = asyncHandler(async (req, res) => {
  console.log(req.params);
  const deltetdRating = await RecipeLike.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getRecipeLikes,
  deleteRecipeLike,
  addRecipeLike,
};
