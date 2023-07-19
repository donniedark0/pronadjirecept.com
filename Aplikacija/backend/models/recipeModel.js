const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name!"],
    },
    description: {
      type: String,
      required: [true, "Please add a recipe description!"],
    },
    imagePath: {
      type: String,
      //required: [true, 'Please add an imagePath!']
    },
    ingredients: {
      type: [mongoose.Schema.Types.ObjectId],
      //required: [true, 'Please add the ingredients!']
    },
    rating: {
      default: 1,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
