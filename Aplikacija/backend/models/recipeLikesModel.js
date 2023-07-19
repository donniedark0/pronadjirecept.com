const mongoose = require("mongoose");

const recipeLikesSchema = mongoose.Schema({
  like: {
    type: Number,
    max: 1,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Recipe",
  },
});

module.exports = mongoose.model("RecipeLikes", recipeLikesSchema);
