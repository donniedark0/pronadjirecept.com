import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import "../components/Recipe.css";
import { FcLike } from "react-icons/fc";
import "../components/Category.css";
import { getRatings } from "../features/rating/ratingSlice";

function SmallRecipe({ recipe, onClick }) {
  const dispatch = useDispatch();

  const [user, setUser] = useState();
  const [ratings, setRatings] = useState(useSelector((state) => state.auth));

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await axios.get(`api/users/${recipe.userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchRatingsForRecipe = async () => {
      try {
        const response = await dispatch(getRatings(recipe._id));
        setRatings((prevRatings) => ({
          ...prevRatings,
          [recipe._id]: response.payload,
        }));
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchUserById();
    fetchRatingsForRecipe();
  }, [recipe._id, recipe.userId, dispatch]);

  return (
    <div class="card swiper-slide">
      <h2 className="styletext small-recipe-name">{recipe.name}</h2>
      <img
        className="styletext small-recipe-picture"
        src={recipe.imagePath}
        onClick={() => onClick(recipe)}
      />
      <h5 className="styletext small-username">{user?.name} </h5>
      {ratings[recipe._id] && (
        <h3 className="styletext small-recipe-rating">
          {ratings[recipe._id].length || "0"} <FcLike fill="#FCB13F" />
        </h3>
      )}
    </div>
  );
}

export default SmallRecipe;
