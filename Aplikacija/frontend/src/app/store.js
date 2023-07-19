import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import recipeReducer from "../features/recipes/recipeSlice";
import ingredientReducer from "../features/ingredients/ingredientSlice";
import categoryReducer from "../features/categories/categorySlice";
import commentReducer from "../features/comments/commentSlice";
import userReducer from "../features/users/userSlice";
import ratingReducer from "../features/rating/ratingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
    ingredients: ingredientReducer,
    categories: categoryReducer,
    comments: commentReducer,
    users: userReducer,
    ratings: ratingReducer,
  },
});
