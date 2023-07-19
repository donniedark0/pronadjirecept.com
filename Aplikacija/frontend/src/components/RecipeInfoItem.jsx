import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../features/users/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { deleteRecipe } from "../features/recipes/recipeSlice";
import "../components/Recipe.css";
import { FcLike } from "react-icons/fc";
import "../components/Button.css";
import {
  createRating,
  deleteRating,
  getRatings,
} from "../features/rating/ratingSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
function RecipeInfoItem({ recipe }) {
  const dispatch = useDispatch();

  const [recipeCreator, setRecipeCreator] = useState();
  const { user } = useSelector((state) => state.auth);

  const { ratings } = useSelector((state) => state.ratings);
  const isLiked = ratings.some((rating) => rating.userId === user?._id);
  const handleLike = () => {
    if (isLiked) {
      const rating = ratings.find((rating) => rating.userId === user?._id);
      dispatch(deleteRating(rating._id));
    } else {
      dispatch(
        createRating({ userId: user._id, recipeId: recipe._id, like: true })
      );

      dispatch(getRatings(recipe._id));
    }
  };

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`api/users/${recipe.userId}`);
        setRecipeCreator(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    dispatch(getRatings(recipe._id));

    getUserById();
  }, [recipe]);

  return (
    <div className="conatinerInfo">
      <h4 className="big-recipe-username">{recipeCreator?.name}</h4>
      <h5 className="styletext big-recipe-rating">
        {ratings.length}
        {user ? (
          <button className="like-btn" onClick={handleLike}>
            {isLiked ? (
              <AiFillHeart className="like" />
            ) : (
              <AiOutlineHeart className="disLike" />
            )}
          </button>
        ) : (
          <AiFillHeart className="like" />
        )}
      </h5>
      {(user?._id === recipe.userId || user?.email === "admin@admin.com") && (
        <button
          className="deleteRecipe"
          onClick={() => {
            dispatch(deleteRecipe(recipe._id));
          }}
        >
          Delete recipe
        </button>
      )}
    </div>
  );
}

export default RecipeInfoItem;
